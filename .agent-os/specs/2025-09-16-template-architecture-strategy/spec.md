# Template Architecture Strategy Specification

## Overview

Document and plan the architectural approach for handling single-site template exports vs multi-site SaaS hosting within UIFoundry's registry-first strategy.

## Context

UIFoundry serves two distinct use cases:

1. **SaaS Platform**: Multi-site PayloadCMS admin panel hosting multiple customer sites
2. **Developer Templates**: Single-site repositories for self-hosting developers

The challenge is managing the complexity between multi-site and single-site configurations while maintaining a registry-first monetization strategy.

## Architecture Strategy

### Registry-First Approach

**Core Philosophy**: Prioritize the component registry as the primary value delivery mechanism, making template exports optional rather than essential.

#### Multi-Site SaaS Platform (Primary)

- **Configuration**: Multi-site PayloadCMS setup with Sites collection
- **Admin Panel**: Single admin interface managing multiple sites
- **Data Isolation**: Site-scoped access controls and content filtering
- **Infrastructure**: Shared AWS resources with domain routing
- **User Management**: RBAC with site-level permissions

#### Single-Site Template Export (Secondary)

- **Configuration**: Transformed single-site payload.config.ts
- **Scope**: Individual site repository with selected components
- **Distribution**: Via authenticated registry access
- **Target Users**: Developers purchasing template access

### Implementation Priorities

1. **Phase 0**: Build multi-site SaaS with comprehensive registry and RBAC
2. **Phase 1**: Add optional template export convenience feature
3. **Phase 2**: Custom domains and LLM site builders

## Technical Approach

### Multi-Site Configuration Structure

```typescript
// src/payload/collections/Sites.ts
export const Sites: CollectionConfig = {
  slug: "sites",
  access: {
    // Site-scoped access controls
  },
  fields: [
    // Site configuration fields
  ],
};

// All collections inherit site-scoping
export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: ({ req }) => ({ site: { equals: req.user.activeSite } }),
  },
};
```

### Template Export Transformation

```typescript
// Transformation logic (future implementation)
function transformMultiSiteConfig(
  multiSiteConfig: PayloadConfig,
): PayloadConfig {
  // Remove Sites collection
  // Remove site-scoping from all access rules
  // Transform collections to single-site structure
  // Preserve field configurations and block definitions
}
```

### Registry Distribution Model

```bash
# Free tier - basic components
npx shadcn add [registry-url]/hero-basic

# Paid tier - premium components (authenticated)
npx shadcn add [registry-url]/hero-premium --auth-token=...

# Template export - complete single-site repo
npx create-uifoundry-template my-site --components=hero,features,cta
```

## Benefits of Registry-First Strategy

1. **Continuous Value Delivery**: New components added to registry ongoing
2. **Lower Development Complexity**: No immediate need for complex export transformations
3. **Scalable Revenue**: Component-level pricing vs one-time template sales
4. **Community Building**: Free tier brings developers into ecosystem
5. **Better Retention**: Ongoing access creates long-term relationships

## Implementation Decisions

### Stage 0 Requirements

- [ ] Sites collection with proper access controls
- [ ] Site-scoped data isolation for all collections
- [ ] User-site relationship management
- [ ] RBAC implementation (Owner, Admin, Editor, Viewer)
- [ ] Admin UI affordances for site context switching
- [ ] Document transformation approach for future template exports

### Future Template Export Requirements

- [ ] Multi-site → single-site payload.config.ts transformation
- [ ] Site content export as seed data
- [ ] Field hook optimizations included in exports
- [ ] Registry compatibility for exported templates
- [ ] GitHub integration for automated repo creation

## Validation Criteria

### Multi-Site Architecture

- Users can create multiple sites from admin panel
- Content is properly isolated between sites
- Role-based permissions work correctly
- Site context switching functions properly

### Registry Strategy

- Components installable via shadcn CLI
- Free/paid tier access controls working
- Documentation and setup guides complete

### Future Template Export

- Transformation preserves all functionality
- Exported templates work independently
- Registry components installable in exported repos

## Related Documentation

- [Product Mission](./../product/mission.md#business-model-strategy)
- [Registry Mapping](../standards/registry-mapping.md)
- [Payload Architecture](../standards/payload-architecture.md)
