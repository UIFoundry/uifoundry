import type { Redis } from "ioredis";
import type { CountArgs, FindArgs, FindGlobalArgs, FindOneArgs } from "payload";

/**
 * Cache options that can be passed to Payload operations
 */
export interface CacheOptions {
	/** Custom cache key (overrides auto-generated key) */
	key?: string;

	/** Skip cache for this query and always hit the database */
	skip?: boolean;

	/** Cache tags for grouped invalidation */
	tags?: string[];

	/** Custom TTL (time to live) in seconds for this query */
	ttl?: number;
}

export type CountArgsWithCache = CountArgs & { cache?: CacheOptions };
/**
 * Extended Payload types with cache options
 * Use these types when you want to pass cache options to Payload operations
 */
export type FindArgsWithCache = FindArgs & { cache?: CacheOptions };
export type FindGlobalArgsWithCache = FindGlobalArgs & { cache?: CacheOptions };
export type FindOneArgsWithCache = FindOneArgs & { cache?: CacheOptions };

/**
 * Plugin configuration options
 */
export interface RedisCachePluginConfig {
	/** Collections to cache (if undefined, caches all collections) */
	collections?: string[];

	/** Enable debug logging */
	debug?: boolean;

	/** Default TTL in seconds (default: 300 = 5 minutes) */
	defaultTTL?: number;

	/** Collections to exclude from caching */
	excludeCollections?: string[];

	/** Globals to exclude from caching */
	excludeGlobals?: string[];

	/** Custom cache key generator */
	generateKey?: (operation: string, args: any) => string;

	/** Globals to cache (if undefined, caches all globals) */
	globals?: string[];

	/** Prefix for all cache keys (default: 'payload') */
	keyPrefix?: string;

	/** Redis connection configuration */
	redis:
	| {
		/** Or provide an existing Redis client instance */
		client: Redis;
		url?: never;
	}
	| {
		client?: never; // Using 'any' to avoid requiring ioredis types
		/** Redis connection URL (e.g., 'redis://localhost:6379') */
		url: string;
	};
}
