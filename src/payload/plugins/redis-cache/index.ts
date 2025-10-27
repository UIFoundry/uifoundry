import type { Redis } from "ioredis";
import type { Plugin } from "payload";

import type { RedisCachePluginConfig } from "./types";

import { wrapAdapterWithCache } from "./adapter";
import { debugLog } from "./utils";

/**
 * Redis Cache Plugin for Payload CMS
 *
 * Automatically caches database queries using Redis, working transparently
 * for both the Local API and REST API.
 *
 * @example
 * ```typescript
 * import { redisCachePlugin } from './plugins/redis-cache'
 *
 * export default buildConfig({
 *   plugins: [
 *     redisCachePlugin({
 *       redis: {
 *         url: process.env.REDIS_URL
 *       },
 *       defaultTTL: 300,
 *       collections: ['pages', 'posts'],
 *       debug: true
 *     })
 *   ]
 * })
 * ```
 */
export const redisCachePlugin =
	(pluginConfig: RedisCachePluginConfig): Plugin =>
		(incomingConfig) => {
			debugLog(pluginConfig, "Initializing Redis Cache Plugin");

			// Wrap the onInit to add our caching logic
			const existingOnInit = incomingConfig.onInit;

			return {
				...incomingConfig,
				onInit: async (payload) => {
					// Call existing onInit first
					if (existingOnInit) {
						await existingOnInit(payload);
					}

					debugLog(pluginConfig, "Setting up Redis cache");

					// Initialize Redis client
					let redis: Redis;

					if (pluginConfig.redis.client) {
						redis = pluginConfig.redis.client;
						debugLog(pluginConfig, "Using provided Redis client");
					} else if (pluginConfig.redis.url) {
						// Dynamically import ioredis to avoid making it a required dependency
						try {
							const { default: Redis } = await import("ioredis");
							redis = new Redis(pluginConfig.redis.url);
							debugLog(
								pluginConfig,
								`Connected to Redis at ${pluginConfig.redis.url}`,
							);
						} catch (error) {
							console.error(
								"[RedisCache] Failed to import ioredis. Please install it: npm install ioredis",
							);
							throw error;
						}
					} else {
						throw new Error(
							"[RedisCache] Either redis.url or redis.client must be provided",
						);
					}

					// Test Redis connection
					try {
						await redis.ping();
						debugLog(pluginConfig, "Redis connection successful");
					} catch (error) {
						console.error("[RedisCache] Failed to connect to Redis:", error);
						throw error;
					}

					// Get the current database adapter
					const originalAdapter = payload.db;

					if (!originalAdapter) {
						throw new Error("[RedisCache] No database adapter found");
					}

					// Wrap the adapter with caching
					payload.db = wrapAdapterWithCache(originalAdapter, redis, pluginConfig);

					debugLog(pluginConfig, "Database adapter wrapped with caching");

					// Log configuration
					if (pluginConfig.debug) {
						console.log("[RedisCache] Configuration:", {
							collections: pluginConfig.collections ?? "all",
							defaultTTL: pluginConfig.defaultTTL ?? 300,
							excludeCollections: pluginConfig.excludeCollections ?? "none",
							excludeGlobals: pluginConfig.excludeGlobals ?? "none",
							globals: pluginConfig.globals ?? "all",
							keyPrefix: pluginConfig.keyPrefix ?? "payload",
						});
					}
				},
			};
		};

export { withCache } from "./context";
// Re-export types and utilities for convenience
export type { CacheOptions, RedisCachePluginConfig } from "./types";
