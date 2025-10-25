/**
 * Example: How to use the Redis Cache Plugin in your Payload config
 *
 * This file shows various configuration examples.
 * Copy the relevant parts to your payload.config.ts
 */

import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { redisCachePlugin } from './index'

// Example 1: Basic Setup (recommended for most use cases)
export const basicExample = buildConfig({
  // ... your other config

  plugins: [
    redisCachePlugin({
      redis: {
        url: process.env.REDIS_URL // e.g., 'redis://localhost:6379'
      },
      // That's it! All queries are now cached with default 5-minute TTL
    })
  ]
})

// Example 2: Production Configuration
export const productionExample = buildConfig({
  // ... your other config

  plugins: [
    redisCachePlugin({
      redis: {
        url: process.env.REDIS_URL
      },

      // Cache for 10 minutes by default
      defaultTTL: 600,

      // Only cache these collections (recommended)
      collections: [
        'pages',
        'posts',
        'sites',
        'themes',
        // Add your frequently-read collections here
      ],

      // Don't cache auth-related collections
      excludeCollections: [
        'users',
        'sessions',
        'accounts',
        'verifications',
        'payload-preferences',
        'payload-migrations',
      ],

      // Cache global data (header, footer, etc.)
      globals: ['header', 'footer', 'siteConfig'],

      // Add prefix to distinguish from other apps using same Redis
      keyPrefix: 'uifoundry',

      // Enable in development to see cache hits/misses
      debug: process.env.NODE_ENV === 'development',
    })
  ]
})

// Example 3: Using an Existing Redis Client
import Redis from 'ioredis'

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: 0,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000)
    return delay
  },
})

export const customClientExample = buildConfig({
  // ... your other config

  plugins: [
    redisCachePlugin({
      redis: {
        client: redisClient // Pass existing Redis client
      },
      defaultTTL: 300,
    })
  ]
})

// Example 4: Custom Cache Key Generator
export const customKeyExample = buildConfig({
  // ... your other config

  plugins: [
    redisCachePlugin({
      redis: {
        url: process.env.REDIS_URL
      },

      // Custom key format: app:collection:operation:id
      generateKey: (operation, args) => {
        const collection = args.collection || args.slug || 'unknown'
        const id = args.id || 'query'
        return `myapp:${collection}:${operation}:${id}`
      },
    })
  ]
})

// ==============================================================================
// Using Cache Options in Your Code
// ==============================================================================

import { getPayload } from './payload/utils'

// Example: Skip cache for admin users
async function getPageForAdmin(slug: string) {
  const payload = await getPayload()

  return payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    cache: {
      skip: true // Always get fresh data for admins
    }
  })
}

// Example: Long cache for static content
async function getStaticPage(slug: string) {
  const payload = await getPayload()

  return payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    cache: {
      ttl: 3600 // Cache for 1 hour
    }
  })
}

// Example: Short cache for dynamic content
async function getLatestPosts() {
  const payload = await getPayload()

  return payload.find({
    collection: 'posts',
    sort: '-createdAt',
    limit: 10,
    cache: {
      ttl: 60 // Cache for 1 minute only
    }
  })
}

// Example: Custom cache key for important queries
async function getHomePage() {
  const payload = await getPayload()

  return payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    cache: {
      key: 'homepage', // Easy to identify in Redis
      ttl: 1800 // 30 minutes
    }
  })
}

// ==============================================================================
// How It Works with Different APIs
// ==============================================================================

// 1. Local API (Server Components, API Routes, etc.)
async function serverComponent() {
  const payload = await getPayload()

  // ✅ Automatically cached
  const pages = await payload.find({ collection: 'pages' })

  return pages
}

// 2. tRPC Procedures (like you're using)
async function trpcProcedure(ctx: any) {
  // ✅ Automatically cached (ctx.payload uses the wrapped adapter)
  const theme = await ctx.payload.findByID({
    collection: 'themes',
    id: 'some-id'
  })

  return theme
}

// 3. REST API
// GET /api/pages
// ✅ Automatically cached

// 4. Admin Panel
// All list views, edit forms, relationships
// ✅ Automatically cached

// 5. GraphQL (if enabled)
// query { pages { docs { id title } } }
// ✅ Automatically cached

// ==============================================================================
// Manual Cache Invalidation (if needed)
// ==============================================================================

import Redis from 'ioredis'

async function manualInvalidation() {
  const redis = new Redis(process.env.REDIS_URL!)

  // Clear all cache for a collection
  const keys = await redis.keys('payload:*:pages:*')
  if (keys.length > 0) {
    await redis.del(...keys)
  }

  // Clear specific cache entry
  await redis.del('payload:homepage')

  // Clear all Payload cache
  const allKeys = await redis.keys('payload:*')
  if (allKeys.length > 0) {
    await redis.del(...allKeys)
  }
}
