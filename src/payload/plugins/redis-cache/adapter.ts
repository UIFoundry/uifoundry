import type {
	DatabaseAdapter,
	Find,
	FindArgs,
	PaginatedDocs,
	TypeWithID,
} from "payload";
import type { RedisCachePluginConfig, CacheOptions } from "./types";
import {
	generateCacheKey,
	getCollectionPattern,
	getGlobalPattern,
	shouldCacheCollection,
	shouldCacheGlobal,
	debugLog,
} from "./utils";
import { getCacheContext } from "./context";
import type Redis from "ioredis";

/**
 * Wraps a Payload database adapter with Redis caching
 */
export function wrapAdapterWithCache(
	baseAdapter: DatabaseAdapter,
	redis: Redis, // Redis client
	config: RedisCachePluginConfig,
): DatabaseAdapter {
	const defaultTTL = config.defaultTTL ?? 300; // 5 minutes

	/**
	 * Get cache options from either args.cache or context
	 * Args takes precedence over context
	 */
	function getCacheOptions(
		args: FindArgs & { cache?: CacheOptions },
	): CacheOptions | undefined {
		// First check if cache options are in args (direct property)
		if (args.cache) {
			return args.cache;
		}

		// Fall back to AsyncLocalStorage context
		return getCacheContext();
	}

	/**
	 * Get data from cache
	 */
	async function getFromCache<T = TypeWithID>(
		key: string,
	): Promise<PaginatedDocs<T> | null> {
		try {
			const cached = await redis.get(key);
			if (cached) {
				debugLog(config, `Cache HIT: ${key}`);
				return JSON.parse(cached) as PaginatedDocs<T>;
			}
			debugLog(config, `Cache MISS: ${key}`);
			return null;
		} catch (error) {
			console.error("[RedisCache] Error reading from cache:", error);
			return null;
		}
	}

	/**
	 * Set data in cache
	 */
	async function setInCache(
		key: string,
		data: unknown,
		ttl: number,
	): Promise<void> {
		try {
			await redis.setex(key, ttl, JSON.stringify(data));
			debugLog(config, `Cache SET: ${key} (TTL: ${ttl}s)`);
		} catch (error) {
			console.error("[RedisCache] Error writing to cache:", error);
		}
	}

	/**
	 * Invalidate cache by pattern
	 */
	async function invalidateByPattern(pattern: string): Promise<void> {
		try {
			const keys = await redis.keys(pattern);
			if (keys.length > 0) {
				await redis.del(...keys);
				debugLog(
					config,
					`Cache INVALIDATED: ${keys.length} keys matching ${pattern}`,
				);
			}
		} catch (error) {
			console.error("[RedisCache] Error invalidating cache:", error);
		}
	}

	return {
		...baseAdapter,

		/**
		 * Cached find operation
		 */
		find: async <T = TypeWithID>(args: any) => {
			const { collection } = args;
			const cache = getCacheOptions(args);

			// Skip cache if requested or collection not configured for caching
			if (cache?.skip || !shouldCacheCollection(collection, config)) {
				debugLog(config, `Cache SKIP: find ${collection}`);
				return baseAdapter.find<T>(args);
			}

			// Generate cache key
			const cacheKey = generateCacheKey("find", args, config);

			// Try to get from cache
			const cached = await getFromCache(cacheKey);
			if (cached) {
				return cached;
			}

			// Cache miss - query database
			const result = await baseAdapter.find<T>(args);

			// Store in cache
			const ttl = cache?.ttl ?? defaultTTL;
			await setInCache(cacheKey, result, ttl);

			return result;
		},

		/**
		 * Cached findOne operation
		 */
		findOne: async <T extends TypeWithID = TypeWithID>(args: any) => {
			const { collection } = args;
			const cache = getCacheOptions(args);

			// Skip cache if requested or collection not configured for caching
			if (cache?.skip || !shouldCacheCollection(collection, config)) {
				debugLog(config, `Cache SKIP: findOne ${collection}`);
				return baseAdapter.findOne<T>(args);
			}

			// Generate cache key
			const cacheKey = generateCacheKey("findOne", args, config);

			// Try to get from cache
			const cached = await getFromCache(cacheKey);
			if (cached) {
				return cached;
			}

			// Cache miss - query database
			const result = await baseAdapter.findOne<T>(args);

			// Store in cache
			const ttl = cache?.ttl || defaultTTL;
			await setInCache(cacheKey, result, ttl);

			return result;
		},

		/**
		 * Cached count operation
		 */
		count: async (args) => {
			const { collection } = args;
			const cache = getCacheOptions(args);

			// Skip cache if requested or collection not configured for caching
			if (cache?.skip || !shouldCacheCollection(collection, config)) {
				debugLog(config, `Cache SKIP: count ${collection}`);
				return baseAdapter.count(args);
			}

			// Generate cache key
			const cacheKey = generateCacheKey("count", args, config);

			// Try to get from cache
			const cached = await getFromCache(cacheKey);
			if (cached !== null) {
				return cached;
			}

			// Cache miss - query database
			const result = await baseAdapter.count(args);

			// Store in cache
			const ttl = cache?.ttl || defaultTTL;
			await setInCache(cacheKey, result, ttl);

			return result;
		},

		/**
		 * Cached findGlobal operation
		 */
		findGlobal: async <T extends Record<string, unknown> = any>(args: any) => {
			const { slug } = args;
			const cache = getCacheOptions(args);

			// Skip cache if requested or global not configured for caching
			if (cache?.skip || !shouldCacheGlobal(slug, config)) {
				debugLog(config, `Cache SKIP: findGlobal ${slug}`);
				return baseAdapter.findGlobal<T>(args);
			}

			// Generate cache key
			const cacheKey = generateCacheKey("findGlobal", args, config);

			// Try to get from cache
			const cached = await getFromCache(cacheKey);
			if (cached) {
				return cached;
			}

			// Cache miss - query database
			const result = await baseAdapter.findGlobal<T>(args);

			// Store in cache
			const ttl = cache?.ttl || defaultTTL;
			await setInCache(cacheKey, result, ttl);

			return result;
		},

		/**
		 * Create with cache invalidation
		 */
		create: async (args) => {
			const result = await baseAdapter.create(args);

			// Invalidate collection cache
			const pattern = getCollectionPattern(args.collection, config);
			await invalidateByPattern(pattern);

			return result;
		},

		/**
		 * UpdateOne with cache invalidation
		 */
		updateOne: async (args: any) => {
			const result = await baseAdapter.updateOne(args);

			// Invalidate collection cache
			const pattern = getCollectionPattern(args.collection, config);
			await invalidateByPattern(pattern);

			return result;
		},

		/**
		 * UpdateMany with cache invalidation
		 */
		updateMany: async (args: any) => {
			const result = await baseAdapter.updateMany(args);

			// Invalidate collection cache
			const pattern = getCollectionPattern(args.collection, config);
			await invalidateByPattern(pattern);

			return result;
		},

		/**
		 * DeleteOne with cache invalidation
		 */
		deleteOne: async (args) => {
			const result = await baseAdapter.deleteOne(args);

			// Invalidate collection cache
			const pattern = getCollectionPattern(args.collection, config);
			await invalidateByPattern(pattern);

			return result;
		},

		/**
		 * DeleteMany with cache invalidation
		 */
		deleteMany: async (args) => {
			const result = await baseAdapter.deleteMany(args);

			// Invalidate collection cache
			const pattern = getCollectionPattern(args.collection, config);
			await invalidateByPattern(pattern);

			return result;
		},

		/**
		 * UpdateGlobal with cache invalidation
		 */
		updateGlobal: async (args) => {
			const result = await baseAdapter.updateGlobal(args);

			// Invalidate global cache
			const pattern = getGlobalPattern(args.slug, config);
			await invalidateByPattern(pattern);

			return result;
		},
	} as DatabaseAdapter;
}
