import { createHash } from 'crypto'

import type { RedisCachePluginConfig } from './types'

/**
 * Log debug message if debug mode is enabled
 */
export function debugLog(
  config: RedisCachePluginConfig,
  message: string,
  data?: any
) {
  if (config.debug) {
    console.log(`[RedisCache] ${message}`, data || '')
  }
}

/**
 * Generate a cache key from operation and arguments
 */
export function generateCacheKey(
  operation: string,
  args: any,
  config: RedisCachePluginConfig
): string {
  const prefix = config.keyPrefix || 'payload'

  // If custom key is provided in cache options, use it
  if (args.cache?.key) {
    return `${prefix}:${args.cache.key}`
  }

  // If custom generator is provided, use it
  if (config.generateKey) {
    return `${prefix}:${config.generateKey(operation, args)}`
  }

  // Default: hash the operation and args
  const dataToHash = {
    id: args.id,
    slug: args.slug,
    collection: args.collection,
    depth: args.depth,
    fallbackLocale: args.fallbackLocale,
    limit: args.limit,
    locale: args.locale,
    operation,
    page: args.page,
    sort: args.sort,
    where: args.where,
  }

  const hash = createHash('md5')
    .update(JSON.stringify(dataToHash))
    .digest('hex')

  const collectionOrGlobal = args.collection || args.slug || 'unknown'

  return `${prefix}:${operation}:${collectionOrGlobal}:${hash}`
}

/**
 * Generate invalidation pattern for a collection
 */
export function getCollectionPattern(
  collection: string,
  config: RedisCachePluginConfig
): string {
  const prefix = config.keyPrefix || 'payload'
  return `${prefix}:*:${collection}:*`
}

/**
 * Generate invalidation pattern for a global
 */
export function getGlobalPattern(
  slug: string,
  config: RedisCachePluginConfig
): string {
  const prefix = config.keyPrefix || 'payload'
  return `${prefix}:*:${slug}:*`
}

/**
 * Generate invalidation patterns for cache tags
 */
export function getTagPatterns(
  tags: string[],
  config: RedisCachePluginConfig
): string[] {
  const prefix = config.keyPrefix || 'payload'
  return tags.map(tag => `${prefix}:*:*:*${tag}*`)
}

/**
 * Check if a collection should be cached based on plugin config
 */
export function shouldCacheCollection(
  slug: string,
  config: RedisCachePluginConfig
): boolean {
  // If excludeCollections is defined and includes this collection, don't cache
  if (config.excludeCollections?.includes(slug)) {
    return false
  }

  // If collections is defined, only cache those specified
  if (config.collections && config.collections.length > 0) {
    return config.collections.includes(slug)
  }

  // Default: cache everything
  return true
}

/**
 * Check if a global should be cached based on plugin config
 */
export function shouldCacheGlobal(
  slug: string,
  config: RedisCachePluginConfig
): boolean {
  // If excludeGlobals is defined and includes this global, don't cache
  if (config.excludeGlobals?.includes(slug)) {
    return false
  }

  // If globals is defined, only cache those specified
  if (config.globals && config.globals.length > 0) {
    return config.globals.includes(slug)
  }

  // Default: cache everything
  return true
}
