# How the Redis Cache Plugin Works

## The Core Question: How Does It Read Cache Options at Runtime?

Great question! The answer involves understanding **TypeScript vs Runtime** and **two approaches** the plugin supports.

---

## Understanding Types vs Runtime

### TypeScript Types (Compile Time)

```typescript
// types.ts
declare module 'payload' {
  export interface FindArgs {
    cache?: CacheOptions  // ← This is ONLY for TypeScript
  }
}
```

**Important**: These type augmentations are **erased at runtime**. They only provide autocomplete and type checking during development.

### JavaScript Runtime

```typescript
// What actually runs:
await payload.find({
  collection: 'pages',
  cache: { skip: true }  // ← This is just a regular object property
})
```

At runtime, `cache` is just a property on a JavaScript object. The plugin reads it like any other property.

---

## How Cache Options Are Passed

The plugin supports **TWO approaches** to pass cache options:

### Approach 1: Direct Property (Recommended)

Pass `cache` as a property directly in the args:

```typescript
const pages = await payload.find({
  collection: 'pages',
  cache: { skip: true }  // ← Passed as property
})
```

**Flow:**

1. You call `payload.find(args)` with `cache` property
2. Payload's core processes the request
3. Payload calls `db.find(args)` - passing the **entire args object**
4. Our wrapped adapter receives `args` with the `cache` property
5. Adapter reads: `const cache = args.cache`

```typescript
// adapter.ts
find: async (args) => {
  const cache = args.cache  // ← Read directly from args

  if (cache?.skip) {
    return baseAdapter.find(args)  // Skip cache
  }
  // ... caching logic
}
```

**Potential Issue**: Payload *might* validate/strip unknown properties before passing to the adapter. If this happens, Approach 2 handles it.

### Approach 2: AsyncLocalStorage Context (Fallback)

Use Node's AsyncLocalStorage to pass cache options "through the air":

```typescript
import { withCache } from '~/plugins/redis-cache'

const pages = await withCache({ skip: true }, () =>
  payload.find({ collection: 'pages' })
)
```

**Flow:**

1. `withCache()` stores cache options in AsyncLocalStorage
2. You call `payload.find()` (no `cache` property needed)
3. Payload processes the request normally
4. Our wrapped adapter checks AsyncLocalStorage for cache options
5. Adapter retrieves options and applies them

```typescript
// adapter.ts
import { getCacheContext } from './context'

find: async (args) => {
  // Try to get from args first, fall back to context
  const cache = args.cache || getCacheContext()

  if (cache?.skip) {
    return baseAdapter.find(args)
  }
  // ... caching logic
}
```

**Benefit**: Works even if Payload strips the `cache` property from args.

---

## Complete Implementation

### Reading Cache Options

```typescript
// adapter.ts - getCacheOptions function

function getCacheOptions(args: any): CacheOptions | undefined {
  // 1. Check if cache options are directly in args
  if (args.cache) {
    return args.cache
  }

  // 2. Fall back to AsyncLocalStorage context
  return getCacheContext()
}
```

### In Practice

```typescript
find: async (args) => {
  const { collection } = args
  const cache = getCacheOptions(args)  // ← Uses both approaches

  // Rest of caching logic...
}
```

---

## Why Both Approaches?

### Use Approach 1 When:
- ✅ You want cleaner, more explicit code
- ✅ You trust Payload to pass properties through
- ✅ You like the inline syntax

```typescript
// Explicit and clear
const pages = await payload.find({
  collection: 'pages',
  cache: { ttl: 600 }
})
```

### Use Approach 2 When:
- ✅ Payload strips the `cache` property
- ✅ You want to wrap multiple queries
- ✅ You need guaranteed context passing

```typescript
// Wrap multiple queries with same cache options
await withCache({ ttl: 3600 }, async () => {
  const header = await payload.findGlobal({ slug: 'header' })
  const footer = await payload.findGlobal({ slug: 'footer' })
  const pages = await payload.find({ collection: 'pages' })
  // All three queries use the same cache options
})
```

---

## How Payload Passes Args to Adapter

### Payload's Flow (Simplified)

```typescript
// Inside Payload's core (conceptual):
class Payload {
  async find(args: FindArgs) {
    // 1. Validate collection exists
    // 2. Apply access control
    // 3. Build database query

    // 4. Call database adapter
    const result = await this.db.find(args)  // ← Passes args

    // 5. Apply field-level permissions
    // 6. Return result
    return result
  }
}
```

**Key Point**: Payload calls `this.db.find(args)` with the args object. Our plugin wraps `db`, so we intercept this call.

### Our Wrapper Intercepts

```typescript
// Our wrapped adapter:
payload.db = {
  find: async (args) => {
    console.log('Intercepted!', args)

    // Read cache options
    const cache = getCacheOptions(args)

    // Check cache
    if (!cache?.skip) {
      const cached = await redis.get(key)
      if (cached) return cached
    }

    // Call original adapter
    return originalAdapter.find(args)
  }
}
```

---

## Does Payload Strip Unknown Properties?

**We don't know for certain**, which is why we support both approaches:

### Scenario A: Payload Preserves Properties ✅

```typescript
// You call:
payload.find({ collection: 'pages', cache: { skip: true } })

// Adapter receives:
{ collection: 'pages', cache: { skip: true } }  // ← cache preserved!

// Approach 1 works ✅
```

### Scenario B: Payload Strips Properties ⚠️

```typescript
// You call:
payload.find({ collection: 'pages', cache: { skip: true } })

// Adapter receives:
{ collection: 'pages' }  // ← cache stripped!

// Approach 1 fails ❌
// Approach 2 works ✅ (uses AsyncLocalStorage)
```

**Solution**: Our plugin tries both approaches, so it works either way!

---

## Testing It

To verify which approach works, enable debug mode:

```typescript
redisCachePlugin({
  debug: true,
  // ...
})
```

Then try both:

```typescript
// Test Approach 1
const pages1 = await payload.find({
  collection: 'pages',
  cache: { skip: true }
})
// Check console: Should see "Cache SKIP: find pages"

// Test Approach 2
import { withCache } from '~/plugins/redis-cache'

const pages2 = await withCache({ skip: true }, () =>
  payload.find({ collection: 'pages' })
)
// Check console: Should also see "Cache SKIP: find pages"
```

If both work, Payload preserves properties. If only Approach 2 works, Payload strips them.

---

## Advanced: AsyncLocalStorage

### What is AsyncLocalStorage?

Node.js feature that stores context throughout an async call chain:

```typescript
const storage = new AsyncLocalStorage()

storage.run({ user: 'alice' }, async () => {
  await doSomething()
  await doSomethingElse()
  // Any function in this chain can access:
  const context = storage.getStore()  // { user: 'alice' }
})
```

### How We Use It

```typescript
// context.ts
const cacheContextStorage = new AsyncLocalStorage<CacheContext>()

export function withCache<T>(
  options: CacheOptions,
  operation: () => Promise<T>
): Promise<T> {
  return cacheContextStorage.run({ options }, operation)
}

export function getCacheContext(): CacheOptions | undefined {
  return cacheContextStorage.getStore()?.options
}
```

### The Magic

```typescript
await withCache({ skip: true }, async () => {
  // options stored in AsyncLocalStorage

  await payload.find({ collection: 'pages' })
  // ↓
  // Eventually calls our adapter
  // ↓
  const cache = getCacheContext()  // ← Retrieves { skip: true }!
})
```

**Benefit**: Context travels through the entire async call stack, even through Payload's internal functions!

---

## Summary

### Question: How does the plugin read cache options at runtime?

**Answer**: Two ways!

1. **Direct Property**: Reads `args.cache` if Payload passes it through
2. **AsyncLocalStorage**: Retrieves from context if property is stripped

### TypeScript Types

- Provide autocomplete and type safety
- Erased at runtime
- Make development easier, but don't affect execution

### Runtime Behavior

- Plugin reads cache options as regular JavaScript object properties
- Falls back to AsyncLocalStorage if needed
- Works regardless of Payload's internal property handling

### Both Approaches Work

```typescript
// Approach 1: Direct (recommended)
await payload.find({
  collection: 'pages',
  cache: { skip: true }
})

// Approach 2: Context (fallback)
await withCache({ skip: true }, () =>
  payload.find({ collection: 'pages' })
)
```

The plugin handles both automatically - you don't need to worry about which one to use!

---

## Next Steps

1. Try Approach 1 first (cleaner syntax)
2. If it doesn't work, use Approach 2
3. Enable `debug: true` to see what's happening
4. Report back if you find Payload strips properties - we can document it!
