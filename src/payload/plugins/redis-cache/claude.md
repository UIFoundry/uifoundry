# Redis Cache Plugin for Payload CMS - Build Guide for AI Agents

## Overview

This is a Payload CMS v3 plugin that adds transparent Redis caching to database queries. It works automatically for both Local API and REST API (including admin panel).

## Problem Statement

Payload CMS v3 does not have built-in Redis caching. The `beforeOperation` and `beforeRead` hooks cannot return cached data to prevent database queries. Users need a solution that:

1. Caches database queries transparently
2. Works with both Local API and REST API
3. Works with the admin panel without code changes
4. Supports per-query cache options (skip, TTL, etc.)
5. Auto-invalidates cache on writes

## Solution Architecture

### Approach: Database Adapter Wrapping

Wrap Payload's database adapter (MongoDB/Postgres) to intercept queries at the lowest level:

```
User Request → Payload API → [Our Cached Adapter] → Original Adapter → Database
                                      ↑
                                  Redis Cache
```

**Benefits:**
- Works for Local API, REST API, and admin panel automatically
- No code changes needed in user's app
- Centralized caching logic
- Automatic invalidation on writes

### Key Technical Decisions

1. **Cache Options Passing**: Support TWO methods
   - Method A: Direct property `args.cache` (if Payload preserves unknown properties)
   - Method B: AsyncLocalStorage context (fallback if Payload strips properties)

2. **Type Augmentation**: Use TypeScript declaration merging to add `cache` option to Payload's types

3. **Cache Invalidation**: On write operations (create/update/delete), invalidate all cache entries for that collection using Redis pattern matching

4. **Cache Key Generation**: Hash the operation + args to create unique cache keys

## File Structure

```
src/plugins/redis-cache/
├── index.ts              # Main plugin export
├── types.ts              # TypeScript types and module augmentation
├── adapter.ts            # Database adapter wrapper with caching logic
├── utils.ts              # Helper functions (cache keys, patterns, etc.)
├── context.ts            # AsyncLocalStorage for cache options
├── package.json          # Package metadata
├── README.md             # User documentation
├── SETUP.md              # Setup and installation guide
├── HOW-IT-WORKS.md       # Technical deep-dive
├── example-usage.ts      # Usage examples
└── claude.md             # This file - build guide for agents

## Implementation Guide

### 1. types.ts

**Purpose**: Define types and augment Payload's module

```typescript
import 'payload'

export interface CacheOptions {
  skip?: boolean      // Skip cache for this query
  ttl?: number        // Custom TTL in seconds
  key?: string        // Custom cache key
  tags?: string[]     // Cache tags for grouped invalidation
}

export interface RedisCachePluginConfig {
  redis: {
    url?: string           // Redis URL
    client?: any           // Or existing Redis client
  }
  defaultTTL?: number      // Default: 300 seconds
  collections?: string[]   // Collections to cache (default: all)
  excludeCollections?: string[]
  globals?: string[]       // Globals to cache (default: all)
  excludeGlobals?: string[]
  generateKey?: (operation: string, args: any) => string
  debug?: boolean
  keyPrefix?: string       // Default: 'payload'
}

// Type augmentation - adds cache option to Payload's methods
declare module 'payload' {
  export interface FindArgs {
    cache?: CacheOptions
  }
  export interface FindOneArgs {
    cache?: CacheOptions
  }
  export interface FindGlobalArgs {
    cache?: CacheOptions
  }
  export interface CountArgs {
    cache?: CacheOptions
  }
}
```

**Key Points:**
- Type augmentation is ONLY for TypeScript - erased at runtime
- Provides autocomplete and type checking for developers
- The actual cache options are passed as regular JavaScript properties

### 2. utils.ts

**Purpose**: Helper functions for cache management

**Functions to implement:**

```typescript
shouldCacheCollection(slug: string, config: RedisCachePluginConfig): boolean
// Check if collection should be cached based on config

shouldCacheGlobal(slug: string, config: RedisCachePluginConfig): boolean
// Check if global should be cached based on config

generateCacheKey(operation: string, args: any, config: RedisCachePluginConfig): string
// Generate cache key: prefix:operation:collection:hash(args)
// Example: payload:find:pages:abc123def456

getCollectionPattern(collection: string, config: RedisCachePluginConfig): string
// Return pattern for invalidating all keys for a collection
// Example: payload:*:pages:*

getGlobalPattern(slug: string, config: RedisCachePluginConfig): string
// Return pattern for invalidating all keys for a global
// Example: payload:*:header:*

debugLog(config: RedisCachePluginConfig, message: string, data?: any): void
// Log debug messages if debug mode enabled
```

**Cache Key Algorithm:**
1. If `args.cache.key` is provided, use it
2. If custom `generateKey` function provided, use it
3. Otherwise: Create MD5 hash of relevant args (collection, where, sort, limit, etc.)
4. Format: `{prefix}:{operation}:{collection}:{hash}`

### 3. context.ts

**Purpose**: AsyncLocalStorage for passing cache options through call stack

```typescript
import { AsyncLocalStorage } from 'async_hooks'

interface CacheContext {
  options?: CacheOptions
}

const cacheContextStorage = new AsyncLocalStorage<CacheContext>()

export function getCacheContext(): CacheOptions | undefined {
  return cacheContextStorage.getStore()?.options
}

export function withCache<T>(
  options: CacheOptions,
  operation: () => Promise<T>
): Promise<T> {
  return cacheContextStorage.run({ options }, operation)
}
```

**Why AsyncLocalStorage?**
- Payload might strip unknown properties from args
- AsyncLocalStorage passes data "through the air" across async calls
- Guaranteed to work even if args.cache is stripped

**Usage:**
```typescript
await withCache({ skip: true }, () =>
  payload.find({ collection: 'pages' })
)
```

### 4. adapter.ts

**Purpose**: Core caching logic - wraps database adapter

**Main Function:**

```typescript
export function wrapAdapterWithCache(
  baseAdapter: DatabaseAdapter,
  redis: any,
  config: RedisCachePluginConfig
): DatabaseAdapter
```

**Implementation Pattern for Read Operations:**

```typescript
find: async (args) => {
  const { collection } = args
  const cache = getCacheOptions(args)  // Try args.cache, fall back to context

  // Skip cache if requested or collection not configured
  if (cache?.skip || !shouldCacheCollection(collection, config)) {
    return baseAdapter.find(args)
  }

  // Generate cache key
  const cacheKey = generateCacheKey('find', args, config)

  // Try cache
  const cached = await getFromCache(cacheKey)
  if (cached) return cached

  // Cache miss - query database
  const result = await baseAdapter.find(args)

  // Store in cache
  const ttl = cache?.ttl || defaultTTL
  await setInCache(cacheKey, result, ttl)

  return result
}
```

**Implementation Pattern for Write Operations:**

```typescript
create: async (args) => {
  const result = await baseAdapter.create(args)

  // Invalidate all cache for this collection
  const pattern = getCollectionPattern(args.collection, config)
  await invalidateByPattern(pattern)

  return result
}
```

**Operations to Wrap:**

Read Operations (with caching):
- `find` - Find documents
- `findOne` - Find single document (used by findByID)
- `count` - Count documents
- `findGlobal` - Find global data

Write Operations (with invalidation):
- `create` - Create document
- `update` - Update documents
- `updateOne` - Update single document
- `delete` - Delete documents
- `deleteOne` - Delete single document
- `deleteMany` - Delete multiple documents
- `updateGlobal` - Update global

**Helper Functions:**

```typescript
function getCacheOptions(args: any): CacheOptions | undefined {
  // Method A: Check args.cache first (direct property)
  if (args.cache) return args.cache

  // Method B: Fall back to AsyncLocalStorage context
  return getCacheContext()
}

async function getFromCache(key: string): Promise<any | null> {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)
  return null
}

async function setInCache(key: string, data: any, ttl: number): Promise<void> {
  await redis.setex(key, ttl, JSON.stringify(data))
}

async function invalidateByPattern(pattern: string): Promise<void> {
  const keys = await redis.keys(pattern)
  if (keys.length > 0) await redis.del(...keys)
}
```

### 5. index.ts

**Purpose**: Main plugin export

```typescript
import type { Plugin } from 'payload'

export const redisCachePlugin = (
  pluginConfig: RedisCachePluginConfig
): Plugin => ({
  name: 'redis-cache',

  onInit: async (payload) => {
    // 1. Initialize Redis client
    let redis: any
    if (pluginConfig.redis.client) {
      redis = pluginConfig.redis.client
    } else if (pluginConfig.redis.url) {
      const { default: Redis } = await import('ioredis')
      redis = new Redis(pluginConfig.redis.url)
    } else {
      throw new Error('Either redis.url or redis.client must be provided')
    }

    // 2. Test connection
    await redis.ping()

    // 3. Wrap the database adapter
    const originalAdapter = payload.db
    payload.db = wrapAdapterWithCache(originalAdapter, redis, pluginConfig)

    // 4. Log configuration if debug mode
    if (pluginConfig.debug) {
      console.log('[RedisCache] Plugin initialized')
    }
  }
})

// Re-export types and utilities
export type { RedisCachePluginConfig, CacheOptions } from './types'
export { withCache } from './context'
```

### 6. package.json

```json
{
  "name": "@payloadcms/plugin-redis-cache",
  "version": "1.0.0",
  "description": "Redis caching plugin for Payload CMS v3",
  "main": "index.ts",
  "types": "index.ts",
  "keywords": ["payload", "payloadcms", "plugin", "redis", "cache"],
  "peerDependencies": {
    "payload": "^3.0.0",
    "ioredis": "^5.0.0"
  }
}
```

## Usage Guide

### Installation

```bash
pnpm add ioredis
```

### Basic Setup

```typescript
// payload.config.ts
import { redisCachePlugin } from './plugins/redis-cache'

export default buildConfig({
  plugins: [
    redisCachePlugin({
      redis: {
        url: process.env.REDIS_URL  // redis://localhost:6379
      }
    })
  ]
})
```

### Recommended Production Config

```typescript
redisCachePlugin({
  redis: {
    url: process.env.REDIS_URL
  },

  // Cache specific collections
  collections: ['pages', 'posts', 'sites', 'themes'],

  // Don't cache auth collections
  excludeCollections: ['users', 'sessions', 'accounts', 'verifications'],

  // Cache globals
  globals: ['header', 'footer'],

  // 5 minute default TTL
  defaultTTL: 300,

  // Key prefix
  keyPrefix: 'myapp',

  // Debug mode
  debug: process.env.NODE_ENV === 'development',
})
```

### Using Cache Options (Method A - Direct Property)

```typescript
// Skip cache
const fresh = await payload.find({
  collection: 'pages',
  cache: { skip: true }
})

// Custom TTL
const posts = await payload.find({
  collection: 'posts',
  cache: { ttl: 3600 }  // 1 hour
})
```

### Using Cache Options (Method B - Context)

```typescript
import { withCache } from './plugins/redis-cache'

// Skip cache
const fresh = await withCache({ skip: true }, () =>
  payload.find({ collection: 'pages' })
)

// Wrap multiple queries
await withCache({ ttl: 3600 }, async () => {
  const header = await payload.findGlobal({ slug: 'header' })
  const footer = await payload.findGlobal({ slug: 'footer' })
  // Both use 1-hour TTL
})
```

## How It Works - Critical Concepts

### 1. Database Adapter Interception

Payload CMS uses a database adapter pattern:

```
Payload API → Database Adapter → Database
```

We wrap the adapter:

```
Payload API → [Our Wrapper + Redis] → Original Adapter → Database
```

All queries (Local API, REST API, admin panel) go through this adapter, so one wrapper caches everything.

### 2. TypeScript vs Runtime

**Compile Time (TypeScript):**
```typescript
declare module 'payload' {
  export interface FindArgs {
    cache?: CacheOptions  // ← Type-only, erased at runtime
  }
}
```

**Runtime (JavaScript):**
```typescript
const args = {
  collection: 'pages',
  cache: { skip: true }  // ← Real JavaScript property
}

const cache = args.cache  // ← Standard property access
```

The type augmentation provides autocomplete. The actual property is read at runtime like any JS object.

### 3. Dual Method for Cache Options

**Problem:** Unsure if Payload preserves `args.cache` when passing to adapter

**Solution:** Support both methods

```typescript
function getCacheOptions(args: any): CacheOptions | undefined {
  // Try direct property first
  if (args.cache) return args.cache

  // Fall back to AsyncLocalStorage context
  return getCacheContext()
}
```

This guarantees cache options work regardless of Payload's internal behavior.

### 4. Cache Invalidation Strategy

**On Write Operations:**
- Invalidate ALL cache entries for the affected collection
- Use Redis pattern matching: `KEYS payload:*:pages:*`
- Delete all matching keys

**Why broad invalidation?**
- Queries can be complex (where clauses, sorts, filters)
- Safer to invalidate everything than risk stale data
- Cache rebuilds quickly on next read

### 5. REST API Automatic Support

REST API calls internally use the Local API:

```
GET /api/pages
  ↓
Payload REST handler
  ↓
payload.find({ collection: 'pages' })
  ↓
Database adapter (cached)
```

No special REST API code needed - it's automatically cached!

## Testing Strategy

### 1. Basic Functionality Test

```typescript
// Test cache miss → hit
const payload = await getPayload()

console.time('first-call')
const result1 = await payload.find({ collection: 'pages' })
console.timeEnd('first-call')  // ~50-100ms

console.time('second-call')
const result2 = await payload.find({ collection: 'pages' })
console.timeEnd('second-call')  // ~1-5ms (from cache)

expect(result1).toEqual(result2)
```

### 2. Cache Invalidation Test

```typescript
// Create → should invalidate cache
await payload.create({
  collection: 'pages',
  data: { title: 'Test' }
})

// Next find should be cache miss
const pages = await payload.find({ collection: 'pages' })
// Should query database, not cache
```

### 3. Cache Skip Test

```typescript
// With skip option
const fresh = await payload.find({
  collection: 'pages',
  cache: { skip: true }
})
// Should always hit database
```

### 4. Admin Panel Test

1. Start dev server
2. Open admin panel
3. Navigate to collection list view
4. Check console for cache logs
5. Refresh page - should load faster
6. Edit document - should invalidate cache
7. View list again - should rebuild cache

### 5. Debug Mode Test

```typescript
redisCachePlugin({
  debug: true,
  // ...
})
```

Should see logs:
```
[RedisCache] Cache MISS: payload:find:pages:abc123
[RedisCache] Cache SET: payload:find:pages:abc123 (TTL: 300s)
[RedisCache] Cache HIT: payload:find:pages:abc123
[RedisCache] Cache INVALIDATED: 5 keys matching payload:*:pages:*
```

## Common Issues & Solutions

### Issue: Cache not working

**Check:**
1. Redis connection: `redis-cli ping`
2. Debug mode: See cache hit/miss logs
3. Collection included: Check `collections` config
4. Environment variable: `REDIS_URL` set correctly

### Issue: Stale data

**Causes:**
1. Direct database writes (bypassing Payload API)
2. TTL too long

**Solutions:**
1. Always use Payload API for writes
2. Reduce `defaultTTL`
3. Manual invalidation: `redis-cli FLUSHDB`

### Issue: Type errors

**Check:**
1. Types exported: `export type { CacheOptions }`
2. Module augmentation in `types.ts`
3. TypeScript version: 4.5+

### Issue: AsyncLocalStorage not working

**Check:**
1. Node.js version: 16+ required
2. Import correct: `import { AsyncLocalStorage } from 'async_hooks'`

## Performance Expectations

| Scenario | Without Cache | With Cache | Improvement |
|----------|--------------|------------|-------------|
| Simple find | 50-100ms | 1-5ms | 10-20x |
| Complex query | 100-500ms | 1-5ms | 20-100x |
| Admin list view | 200-400ms | 5-10ms | 20-40x |
| Relationships | 500-1000ms | 5-15ms | 30-100x |

## Dependencies

**Required:**
- `payload` ^3.0.0
- `ioredis` ^5.0.0

**Built-in:**
- `async_hooks` (Node.js)
- `crypto` (Node.js)

## Build Checklist

- [ ] Create `types.ts` with module augmentation
- [ ] Create `utils.ts` with helper functions
- [ ] Create `context.ts` with AsyncLocalStorage
- [ ] Create `adapter.ts` with wrapper logic
- [ ] Create `index.ts` with plugin export
- [ ] Create `package.json`
- [ ] Create `README.md`
- [ ] Create `SETUP.md`
- [ ] Create `HOW-IT-WORKS.md`
- [ ] Create `example-usage.ts`
- [ ] Test basic caching
- [ ] Test cache invalidation
- [ ] Test admin panel
- [ ] Test both cache option methods
- [ ] Verify TypeScript types work
- [ ] Test with debug mode
- [ ] Performance benchmarks

## Agent Instructions

When building this plugin:

1. **Start with types.ts** - Get the TypeScript foundation right
2. **Build utils.ts** - Test cache key generation works
3. **Implement context.ts** - Verify AsyncLocalStorage works
4. **Core logic in adapter.ts** - This is the most complex file
5. **Wire up index.ts** - Connect everything
6. **Test incrementally** - Don't build everything before testing
7. **Use debug mode** - Essential for understanding behavior
8. **Document as you go** - Update docs with learnings

## Key Success Criteria

✅ Queries are cached (see faster response times)
✅ Cache invalidates on writes (no stale data)
✅ Admin panel loads faster
✅ Both cache option methods work
✅ TypeScript types provide autocomplete
✅ Debug logs show cache hits/misses
✅ No errors in production

## Questions to Validate During Build

1. Does Payload preserve `args.cache` property? (Test both methods)
2. What operations does the adapter expose? (Check DatabaseAdapter type)
3. Does Redis connection work in production? (Test with TLS)
4. How large are serialized cache values? (Monitor Redis memory)
5. Are there edge cases with certain queries? (Complex where clauses, etc.)

## Post-Build Next Steps

After confirming everything works:

1. Update this documentation with actual findings
2. Document which cache method works (or if both work)
3. Add any discovered edge cases
4. Include production deployment notes
5. Add troubleshooting section with real issues encountered
6. Performance benchmark results
7. Redis memory usage patterns

---

## Current Status

**Status:** Initial design complete, not yet tested

**Next Steps:**
1. Build plugin in separate repo using Payload plugin template
2. Test all functionality
3. Update this documentation with findings
4. Publish to npm

**Notes for Next Agent:**
- This is a greenfield implementation
- Test incrementally as you build
- Document any deviations from this design
- Update this file with actual learnings
