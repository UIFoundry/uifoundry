# Redis Cache Plugin - Setup Guide

This guide will help you set up the Redis Cache Plugin for your Payload CMS project.

## Prerequisites

- Payload CMS v3
- Node.js 18+
- Redis server (local or cloud)

## Step 1: Install Redis Client

```bash
pnpm add ioredis
# or
npm install ioredis
```

## Step 2: Set Up Redis Server

### Option A: Local Development (Docker)

```bash
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:latest
```

### Option B: Local Development (Homebrew on macOS)

```bash
brew install redis
brew services start redis
```

### Option C: Production (Cloud Services)

**Upstash** (Recommended for serverless):
- Visit https://upstash.com
- Create a Redis database
- Copy the connection URL

**AWS ElastiCache**:
- Create an ElastiCache cluster
- Use the endpoint URL

**Redis Cloud**:
- Visit https://redis.com/try-free
- Create a database
- Copy the connection URL

## Step 3: Add Environment Variables

Add to your `.env` file:

```bash
# Local development
REDIS_URL=redis://localhost:6379

# Production (example with Upstash)
REDIS_URL=rediss://default:your-password@your-redis-url.upstash.io:6379
```

## Step 4: Add Plugin to Payload Config

Edit `src/payload.config.ts`:

```typescript
import { redisCachePlugin } from '~/plugins/redis-cache'

export default buildConfig({
  // ... your existing config

  plugins: [
    // ... your existing plugins (s3Storage, etc.)

    redisCachePlugin({
      redis: {
        url: process.env.REDIS_URL!
      },

      // Recommended: Only cache specific collections
      collections: [
        'pages',
        'posts',
        'sites',
        'themes',
      ],

      // Don't cache auth collections
      excludeCollections: [
        'users',
        'sessions',
        'accounts',
        'verifications',
        'payload-preferences',
        'payload-migrations',
      ],

      // Cache globals
      globals: ['header', 'footer', 'siteConfig'],

      // Default cache duration: 5 minutes
      defaultTTL: 300,

      // Key prefix (useful if multiple apps share same Redis)
      keyPrefix: 'uifoundry',

      // Enable debug mode in development
      debug: process.env.NODE_ENV === 'development',
    })
  ]
})
```

## Step 5: Update Environment Types (Optional)

If using TypeScript, add to `src/env.mjs`:

```typescript
export const env = createEnv({
  server: {
    // ... existing vars
    REDIS_URL: z.string().url(),
  },
  // ...
})
```

## Step 6: Verify It Works

Start your dev server and check the console:

```bash
pnpm dev
```

You should see:

```
[RedisCache] Initializing Redis Cache Plugin
[RedisCache] Connected to Redis at redis://localhost:6379
[RedisCache] Redis connection successful
[RedisCache] Database adapter wrapped with caching
```

## Step 7: Test Cache Behavior

### Test 1: Check Cache Hits

With `debug: true`, you'll see:

```
[RedisCache] Cache MISS: payload:find:pages:abc123
[RedisCache] Cache SET: payload:find:pages:abc123 (TTL: 300s)
[RedisCache] Cache HIT: payload:find:pages:abc123
```

### Test 2: Query a Page Twice

```typescript
const payload = await getPayload()

// First call - cache miss, queries database
const pages1 = await payload.find({ collection: 'pages' })
console.time('first-call')
console.timeEnd('first-call') // ~50-100ms

// Second call - cache hit, returns from Redis
const pages2 = await payload.find({ collection: 'pages' })
console.time('second-call')
console.timeEnd('second-call') // ~1-5ms
```

### Test 3: Admin Panel

1. Open Payload admin panel
2. Navigate to Pages collection
3. First load will be normal speed
4. Refresh the page - should load much faster!

### Test 4: Cache Invalidation

1. Edit a page in admin panel
2. Save changes
3. Check console - should see: `[RedisCache] Cache INVALIDATED: X keys matching payload:*:pages:*`
4. Next query will be fresh from database

## Configuration Examples

### For Your UIFoundry Project

Based on your collections, here's a recommended config:

```typescript
redisCachePlugin({
  redis: {
    url: process.env.REDIS_URL!
  },

  collections: [
    'pages',
    'sites',
    'themes',
    'media',
  ],

  excludeCollections: [
    'users',
    'sessions',
    'accounts',
    'verifications',
  ],

  globals: ['footer', 'siteConfig'],

  // 10 minute cache for mostly-static content
  defaultTTL: 600,

  keyPrefix: 'uifoundry',
  debug: true,
})
```

### For tRPC Queries

Your existing tRPC code will automatically benefit:

```typescript
// src/server/api/routers/themes.ts
export const themesRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // ✅ This is now cached automatically!
      const theme = await ctx.payload.findByID({
        collection: 'themes',
        id: input.id
      })
      return theme
    })
})
```

If you want to skip cache for specific queries:

```typescript
// Skip cache for admin queries
const theme = await ctx.payload.findByID({
  collection: 'themes',
  id: input.id,
  cache: { skip: true } // ← Add this
})
```

## Monitoring

### Check Redis Usage

```bash
# Connect to Redis CLI
redis-cli

# See all keys
KEYS payload:*

# Check memory usage
INFO memory

# See specific key
GET payload:find:pages:abc123

# Clear all cache
FLUSHDB
```

### Monitor Cache Hit Rate

Enable debug mode and watch your logs:

```typescript
debug: true
```

You should see more HITs than MISSes for good cache performance.

## Performance Expectations

| Scenario | Without Cache | With Cache | Improvement |
|----------|--------------|------------|-------------|
| Simple find | 50-100ms | 1-5ms | 10-20x faster |
| Complex query | 100-500ms | 1-5ms | 20-100x faster |
| Admin list view | 200-400ms | 5-10ms | 20-40x faster |
| Relationship queries | 500-1000ms | 5-15ms | 30-100x faster |

## Troubleshooting

### Plugin not working?

1. **Check Redis connection**:
   ```bash
   redis-cli ping
   # Should return: PONG
   ```

2. **Verify environment variable**:
   ```typescript
   console.log('Redis URL:', process.env.REDIS_URL)
   ```

3. **Enable debug mode** to see what's happening:
   ```typescript
   debug: true
   ```

### Seeing stale data?

1. **Check TTL** - might be too long:
   ```typescript
   defaultTTL: 60 // Try shorter TTL
   ```

2. **Verify cache invalidation** - should happen automatically on updates

3. **Manual cache clear**:
   ```bash
   redis-cli FLUSHDB
   ```

### Redis connection errors?

1. **Wrong URL format**:
   ```bash
   # Correct formats:
   redis://localhost:6379
   rediss://user:pass@host:6379
   redis://:password@localhost:6379
   ```

2. **Network issues**:
   - Check firewall settings
   - Verify Redis port is accessible
   - Check if Redis requires authentication

## Next Steps

1. ✅ **Monitor performance** - Use debug mode to see cache hits
2. ✅ **Tune TTLs** - Adjust based on your content update frequency
3. ✅ **Add Redis monitoring** - Use Redis Insight or similar tools
4. ✅ **Consider Redis persistence** - Configure RDB or AOF for production
5. ✅ **Set up Redis clustering** - For high-traffic production deployments

## Advanced: Production Checklist

- [ ] Redis persistence enabled (RDB or AOF)
- [ ] Redis password authentication configured
- [ ] TLS/SSL enabled for Redis connection
- [ ] Redis memory limit set (`maxmemory` policy)
- [ ] Monitoring set up (CloudWatch, Datadog, etc.)
- [ ] Backup strategy for Redis data
- [ ] Cache warm-up strategy (optional)
- [ ] Redis connection pooling configured

## Questions?

Check the [README.md](./README.md) for more details and examples.
