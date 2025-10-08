# Missing Components Analysis

> Analysis of components that exist in src/ but are missing from the registry

## Missing Block Components

The following block variants exist in `src/payload/blocks/` but are not yet in the registry:

### Missing Blocks

- [ ] **About/About_1** → `about/about-1`
- [ ] **Contact/Contact_1** → `contact/contact-1`
- [ ] **CTA/CTA_1** → `cta/cta-1`
- [ ] **FAQ/FAQ_1** → `faq/faq-1`
- [ ] **Features/Features_1** → `features/features-1`
- [ ] **Features/Features_2** → `features/features-2`
- [ ] **Footer/Footer_1** → `footer/footer-1`
- [ ] **Gallery/Gallery_1** → `gallery/gallery-1`
- [ ] **Hero/Hero_2** → `hero/hero-2`
- [ ] **Newsletter/Newsletter_1** → `newsletter/newsletter-1`
- [ ] **Pricing/Pricing_1** → `pricing/pricing-1`
- [ ] **Stats/Stats_1** → `stats/stats-1`
- [ ] **Teams/Teams_1** → `teams/teams-1`
- [ ] **Testimonials/Testimonials_1** → `testimonials/testimonials-1`

### Already in Registry

- [x] **Header/Header_1** → `header/header-1`
- [x] **Header/Header_2** → `header/header-2`
- [x] **Hero/Hero_1** → `hero/hero-1`

## Missing Field Components

Fields that may need registry distribution:

### Fields with Components

- [ ] **colorField** → `color/color-field` (already exists)
- [ ] **iconField** → `icon/icon-field`
- [ ] **socialLinksField** → `social-links/social-links-field`

### Fields Config-Only

- [ ] **callToActionPairField** → `cta-pair/cta-pair-field`
- [ ] **colorPaletteField** → `color-palette/color-palette-field`
- [ ] **descriptionField** → `description/description-field`
- [ ] **selectEnumField** → `select-enum/select-enum-field`
- [ ] **titleField** → `title/title-field`

### Already in Registry

- [x] **headerField** → `header/header-field`
- [x] **mediaField** → `media/media-field`
- [x] **subheaderField** → `subheader/subheader-field`
- [x] **uploadField** → `upload/upload-field`

## Missing Global Components

Globals that need registry distribution:

### Missing Globals

- [ ] **Footer** → `footer/footer-global`
- [ ] **SiteConfig** → `site-config/site-config-global`

### Already in Registry

- [x] **Header** → `header/header-global`

## Constants and Utilities

Supporting files that need registry distribution:

### Constants

- [ ] **constants/themes.ts** → Update existing constants or add theme constants

### Missing Core Components

- [ ] **RenderBlocks** variations or updates (already exists but may need updates)

## Component Addition Priority

### High Priority (Marketing Blocks - Phase 0 Roadmap)

1. **Hero/Hero_2** - Complete hero block collection
2. **CTA/CTA_1** - Essential for conversions
3. **Features/Features_1** & **Features/Features_2** - Product showcasing
4. **Testimonials/Testimonials_1** - Social proof
5. **FAQ/FAQ_1** - Customer support

### Medium Priority (Content Blocks)

1. **About/About_1** - Company information
2. **Gallery/Gallery_1** - Media showcasing
3. **Stats/Stats_1** - Data visualization
4. **Teams/Teams_1** - Team presentation

### Lower Priority (Specialized Blocks)

1. **Contact/Contact_1** - Contact forms
2. **Footer/Footer_1** - Site footer
3. **Newsletter/Newsletter_1** - Email capture
4. **Pricing/Pricing_1** - Pricing tables

### Field Components Priority

1. **iconField** - Icon selection functionality
2. **socialLinksField** - Social media links
3. **colorPaletteField** - Advanced color management
4. **callToActionPairField** - CTA configurations

## Estimated Work

### Per Block Component (~30-45 minutes each)

1. **Analysis** (5 minutes): Examine source files and dependencies
2. **Directory setup** (5 minutes): Create registry structure
3. **File transformation** (15-20 minutes): Copy files and transform imports
4. **Registry configuration** (5-10 minutes): Add to registry.json
5. **Testing** (5 minutes): Build and validate

### Total Estimated Time

- **14 missing blocks** × 35 minutes = ~8 hours
- **Field components** × 25 minutes = ~3 hours
- **Global components** × 30 minutes = ~1 hour
- **Total: ~12 hours** for complete registry coverage

## Dependencies Analysis

### Common Block Dependencies

Most blocks will likely depend on:

- `@uifoundry/style-utils`
- `@uifoundry/header-field`
- `@uifoundry/subheader-field`
- `@uifoundry/media-field`
- Standard packages: `react`, `next`, `lucide-react`

### Unique Dependencies to Check

- Image optimization components
- Form handling utilities
- Animation libraries
- Chart/stats visualization libraries

## Success Metrics

### Completion Targets

- [ ] All 17 source blocks available in registry
- [ ] All field components with React implementations distributed
- [ ] All global components available
- [ ] Registry build completes without errors
- [ ] All components install via shadcn CLI
- [ ] Documentation updated for new components

### Quality Checks

- [ ] Import transformations correct for all components
- [ ] Dependencies properly listed
- [ ] Component functionality preserved
- [ ] TypeScript compilation successful
- [ ] Components work in test installations
