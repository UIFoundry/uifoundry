import "payload";
import type { Redis } from "ioredis";

/**
 * Cache options that can be passed to Payload operations
 */
export interface CacheOptions {
	/** Skip cache for this query and always hit the database */
	skip?: boolean;

	/** Custom TTL (time to live) in seconds for this query */
	ttl?: number;

	/** Custom cache key (overrides auto-generated key) */
	key?: string;

	/** Cache tags for grouped invalidation */
	tags?: string[];
}

/**
 * Plugin configuration options
 */
export interface RedisCachePluginConfig {
	/** Redis connection configuration */
	redis:
	| {
		/** Redis connection URL (e.g., 'redis://localhost:6379') */
		url: string;
		client?: never; // Using 'any' to avoid requiring ioredis types
	}
	| {
		url?: never;
		/** Or provide an existing Redis client instance */
		client: Redis;
	};

	/** Default TTL in seconds (default: 300 = 5 minutes) */
	defaultTTL?: number;

	/** Collections to cache (if undefined, caches all collections) */
	collections?: string[];

	/** Collections to exclude from caching */
	excludeCollections?: string[];

	/** Globals to cache (if undefined, caches all globals) */
	globals?: string[];

	/** Globals to exclude from caching */
	excludeGlobals?: string[];

	/** Custom cache key generator */
	generateKey?: (operation: string, args: any) => string;

	/** Enable debug logging */
	debug?: boolean;

	/** Prefix for all cache keys (default: 'payload') */
	keyPrefix?: string;
}

