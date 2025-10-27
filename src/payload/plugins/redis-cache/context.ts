import { AsyncLocalStorage } from 'async_hooks'

import type { CacheOptions } from './types'

/**
 * Cache context using AsyncLocalStorage
 *
 * This allows us to pass cache options through the call stack
 * even if Payload strips unknown properties from args.
 */

interface CacheContext {
  options?: CacheOptions
}

const cacheContextStorage = new AsyncLocalStorage<CacheContext>()

/**
 * Get current cache options from context
 */
export function getCacheContext(): CacheOptions | undefined {
  return cacheContextStorage.getStore()?.options
}

/**
 * Set cache options for the current operation
 */
export function setCacheContext(options: CacheOptions): void {
  const store = cacheContextStorage.getStore()
  if (store) {
    store.options = options
  }
}

/**
 * Wrapper for Payload operations with cache options
 *
 * Usage:
 * ```typescript
 * const pages = await withCache({ skip: true }, () =>
 *   payload.find({ collection: 'pages' })
 * )
 * ```
 */
export async function withCache<T>(
  options: CacheOptions,
  operation: () => Promise<T>
): Promise<T> {
  return withCacheContext(options, operation)
}

/**
 * Run a function with cache context
 */
export function withCacheContext<T>(
  options: CacheOptions,
  fn: () => Promise<T>
): Promise<T> {
  return cacheContextStorage.run({ options }, fn)
}
