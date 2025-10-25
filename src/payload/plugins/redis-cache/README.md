# Redis Cache Plugin for Payload CMS

A Payload CMS plugin that adds transparent Redis caching to your database queries, working automatically for both the Local API and REST API (including the admin panel).

## Features

- ✅ **Transparent Caching**: Works automatically with existing Payload API calls
- ✅ **Admin Panel Support**: Speeds up admin panel queries without code changes
- ✅ **Type-Safe**: Full TypeScript support with cache option types
- ✅ **Flexible Configuration**: Cache specific collections/globals or everything
- ✅ **Auto-Invalidation**: Automatically clears cache on create/update/delete
- ✅ **Granular Control**: Per-query cache options (skip, TTL, tags)
- ✅ **Debug Mode**: Optional logging for cache hits/misses

## Installation

```bash
npm install ioredis
# or
pnpm add ioredis
```

## Usage

### Basic Setup

Add the plugin to your Payload config:

```typescript
// payload.config.ts
import { redisCachePlugin } from './plugins/redis-cache'

export default buildConfig({
  // ... your config

  plugins: [
    redisCachePlugin({
      redis: {
        url: process.env.REDIS_URL // e.g., 'redis://localhost:6379'
      }
    })
  ]
})
```

That's it! All your queries are now cached. 🎉

### Advanced Configuration

```typescript
redisCachePlugin({
  redis: {
    url: process.env.REDIS_URL
  },

  // Default TTL for all cached queries (default: 300 seconds / 5 minutes)
  defaultTTL: 600,

  // Only cache specific collections
  collections: ['pages', 'posts', 'products'],

  // Or exclude specific collections
  excludeCollections: ['sessions', 'audit-logs'],

  // Only cache specific globals
  globals: ['header', 'footer'],

  // Or exclude specific globals
  excludeGlobals: ['draft-config'],

  // Custom cache key prefix (default: 'payload')
  keyPrefix: 'myapp',

  // Enable debug logging
  debug: true,

  // Custom cache key generator
  generateKey: (operation, args) => {
    return `custom:${operation}:${args.collection}:${args.id || 'all'}`
  }
})
```

## Using Cache Options in Queries

The plugin adds optional `cache` parameters to all Payload queries:

### Skip Cache for a Query

```typescript
const payload = await getPayload()

// This query will always hit the database
const freshData = await payload.find({
  collection: 'pages',
  cache: { skip: true }
})
```

### Custom TTL per Query

```typescript
// Cache for 1 hour instead of default 5 minutes
const posts = await payload.find({
  collection: 'posts',
  cache: { ttl: 3600 }
})
```

### Cache with Tags (for grouped invalidation)

```typescript
const homePage = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
  cache: { tags: ['landing', 'homepage'] }
})

// Later, invalidate all queries with these tags
// (Note: tag-based invalidation is a planned feature)
```

### Custom Cache Key

```typescript
const page = await payload.findByID({
  collection: 'pages',
  id: '123',
  cache: { key: 'homepage-hero' }
})
```

## How It Works

### Architecture

```
User Request
    ↓
REST API / Local API
    ↓
Payload Core
    ↓
Redis Cache Plugin (checks cache)
    ↓
Database Adapter (MongoDB/Postgres)
    ↓
Database
```

The plugin wraps your database adapter, intercepting all queries:

1. **Read Operations** (find, findOne, count, findGlobal):
   - Check Redis cache first
   - If found, return cached data
   - If not, query database and cache result

2. **Write Operations** (create, update, delete):
   - Execute database operation
   - Invalidate related cache entries

### Cache Invalidation

Cache is automatically invalidated when data changes:

```typescript
// This creates a new page
await payload.create({
  collection: 'pages',
  data: { title: 'New Page' }
})
// ↑ Automatically invalidates ALL cached 'pages' queries

// This updates a page
await payload.update({
  collection: 'pages',
  id: '123',
  data: { title: 'Updated' }
})
// ↑ Automatically invalidates ALL cached 'pages' queries
```

## REST API & Admin Panel

The plugin works automatically with:

- **REST API**: All `/api/pages`, `/api/posts` endpoints are cached
- **Admin Panel**: List views, edit forms, and relationships load from cache
- **GraphQL**: If you use Payload's GraphQL, queries are cached too

No additional configuration needed!

## Environment Variables

```bash
# .env
REDIS_URL=redis://localhost:6379

# For Redis Cloud or other providers:
REDIS_URL=redis://username:password@your-redis-host:6379
```

## Performance Tips

1. **Cache Frequently Read Data**: Collections that are read often but updated rarely benefit most
2. **Exclude Auth Collections**: Don't cache `users`, `sessions`, or other auth-related collections
3. **Use Shorter TTLs for Dynamic Content**: Set lower TTLs for frequently changing data
4. **Monitor Cache Size**: Use Redis monitoring tools to track memory usage

## Troubleshooting

### Plugin not caching?

1. Check Redis connection:
   ```bash
   redis-cli ping
   # Should return PONG
   ```

2. Enable debug mode:
   ```typescript
   redisCachePlugin({
     redis: { url: process.env.REDIS_URL },
     debug: true // See cache hits/misses in console
   })
   ```

3. Verify collection is not excluded:
   ```typescript
   collections: ['pages'] // Make sure your collection is included
   ```

### Cache not invalidating?

The plugin automatically invalidates cache on write operations. If you're seeing stale data:

1. Check that writes go through Payload's API (not direct database writes)
2. Consider using shorter TTLs for frequently updated data
3. Manually clear cache if needed:
   ```bash
   redis-cli KEYS "payload:*" | xargs redis-cli DEL
   ```

## TypeScript

The plugin includes full TypeScript support. Cache options are automatically available on all Payload query methods:

```typescript
// TypeScript knows about the cache option
const result = await payload.find({
  collection: 'pages',
  cache: {
    skip: boolean,
    ttl: number,
    key: string,
    tags: string[]
  }
})
```

## Examples

### Example 1: E-commerce Site

```typescript
redisCachePlugin({
  redis: { url: process.env.REDIS_URL },

  // Cache product catalog heavily
  collections: ['products', 'categories'],
  defaultTTL: 3600, // 1 hour

  // Don't cache orders or cart
  excludeCollections: ['orders', 'cart']
})
```

### Example 2: Blog

```typescript
redisCachePlugin({
  redis: { url: process.env.REDIS_URL },

  // Long cache for published content
  collections: ['posts', 'authors'],
  defaultTTL: 1800, // 30 minutes

  // Don't cache drafts
  excludeCollections: ['post-drafts']
})
```

### Example 3: SaaS Application

```typescript
redisCachePlugin({
  redis: { url: process.env.REDIS_URL },

  // Short cache for dynamic data
  defaultTTL: 60, // 1 minute

  // Don't cache user data or sessions
  excludeCollections: ['users', 'sessions', 'audit-logs']
})
```

## License

MIT
