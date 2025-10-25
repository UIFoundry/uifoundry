# Redis Cache Plugin - Quick Start

## Current Status

✅ Plugin code is complete and ready to test
✅ Dependencies installed (`ioredis`)
❌ Redis server not yet configured

## To Test It Right Now

### Step 1: Start Redis

**Option A - Docker (Easiest):**
```bash
docker run -d --name redis -p 6379:6379 redis:latest
```

**Option B - Local Install (macOS):**
```bash
brew install redis
brew services start redis
```

**Option C - Cloud (Upstash - Free):**
1. Visit https://upstash.com
2. Create account and database
3. Copy the Redis URL

### Step 2: Add Environment Variable

Add to `.env.local`:
```bash
REDIS_URL=redis://localhost:6379
# Or use your Upstash URL
```

### Step 3: Update Payload Config

**Either:**

**A) Copy the example config:**
```bash
cp src/payload.config.example-with-cache.ts src/payload.config.ts
```

**B) Or manually add the plugin to your existing config:**
```typescript
// src/payload.config.ts
import { redisCachePlugin } from "~/plugins/redis-cache"

export default buildConfig({
  // ... your existing config

  plugins: [
    // ... your existing plugins (s3Storage, etc.)

    redisCachePlugin({
      redis: {
        url: process.env.REDIS_URL!
      },
      collections: ['pages', 'sites', 'themes'],
      excludeCollections: ['users', 'sessions', 'accounts', 'verifications'],
      globals: ['footer', 'siteConfig'],
      defaultTTL: 300,
      keyPrefix: 'uifoundry',
      debug: true,  // See cache logs!
    })
  ]
})
```

### Step 4: Start Dev Server

```bash
pnpm dev
```

### Step 5: Verify It Works

You should see in the console:
```
[RedisCache] Initializing Redis Cache Plugin
[RedisCache] Connected to Redis at redis://localhost:6379
[RedisCache] Redis connection successful
[RedisCache] Database adapter wrapped with caching
```

### Step 6: Test Cache Behavior

**Test 1: Navigate to admin panel**
1. Go to `http://localhost:3000/admin`
2. Click on "Pages" or "Sites"
3. First load will be normal speed
4. Check console - should see `[RedisCache] Cache MISS`
5. Refresh the page
6. Should load faster + see `[RedisCache] Cache HIT`

**Test 2: Edit a page**
1. Edit any page and save
2. Check console - should see `[RedisCache] Cache INVALIDATED`
3. View pages list again
4. Should see `[RedisCache] Cache MISS` (cache was cleared)

**Test 3: Use cache options in code**

Edit any file that queries Payload:
```typescript
import { getPayload } from '~/payload/utils'

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

## What to Watch For

✅ **Expected:** Faster load times on repeated queries
✅ **Expected:** Cache invalidation on edits
✅ **Expected:** Debug logs showing HIT/MISS

❌ **Problem:** No cache logs → Check Redis connection
❌ **Problem:** Stale data → Check invalidation is working
❌ **Problem:** Type errors → Run `pnpm typecheck`

## Monitoring Redis

```bash
# Connect to Redis CLI
redis-cli

# See all cached keys
KEYS payload:*

# Check specific key
GET payload:find:pages:abc123

# See memory usage
INFO memory

# Clear all cache (for testing)
FLUSHDB
```

## Performance Testing

```typescript
// In any file that uses Payload:
console.time('query-1')
const result1 = await payload.find({ collection: 'pages' })
console.timeEnd('query-1')  // ~50-100ms (database)

console.time('query-2')
const result2 = await payload.find({ collection: 'pages' })
console.timeEnd('query-2')  // ~1-5ms (cache!)
```

## Troubleshooting

### Redis connection failed

```bash
# Test Redis is running:
docker ps | grep redis
# or
brew services list | grep redis

# Test connection:
redis-cli ping
# Should return: PONG
```

### Plugin not loading

Check imports in `payload.config.ts`:
```typescript
import { redisCachePlugin } from "~/plugins/redis-cache"
//                             ^^^^^ Correct path?
```

### TypeScript errors

```bash
# Regenerate types
pnpm payload generate:types

# Check for errors
pnpm typecheck
```

## Next Steps After Testing

Once you confirm it works:

1. ✅ Test all cache scenarios
2. ✅ Benchmark performance improvements
3. ✅ Update `claude.md` with findings
4. ✅ Decide if you want to publish as npm package
5. ✅ If publishing, extract to separate repo

## The Plugin is Already Complete

All files are in `/src/plugins/redis-cache/`:
- ✅ `index.ts` - Main plugin
- ✅ `types.ts` - TypeScript types
- ✅ `adapter.ts` - Caching logic
- ✅ `utils.ts` - Helper functions
- ✅ `context.ts` - AsyncLocalStorage
- ✅ `README.md` - Full documentation
- ✅ `SETUP.md` - Installation guide
- ✅ `HOW-IT-WORKS.md` - Technical deep-dive
- ✅ `claude.md` - Build guide for agents

**You can test it immediately** once Redis is set up!
