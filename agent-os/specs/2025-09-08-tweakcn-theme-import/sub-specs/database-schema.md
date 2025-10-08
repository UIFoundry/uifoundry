# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-09-08-tweakcn-theme-import/spec.md

## Changes

### Create New SiteConfig Global

**NEW GLOBAL**: Create SiteConfig global at `~/payload/globals/SiteConfig/config.ts` for theme management while preserving existing Themes collection.

```typescript
// ~/payload/globals/SiteConfig/config.ts
export const SiteConfigGlobal: GlobalConfig = {
  slug: "site-config",
  label: "Site Configuration",
  admin: {
    livePreview: {
      url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/preview/home?draft=true`,
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: AUTOSAVE_INTERVAL,
      },
    },
  },
  fields: [
    {
      name: "activeTheme",
      type: "relationship",
      relationTo: COLLECTION_SLUG_THEMES,
      label: "Active Site Theme",
      required: true,
      admin: {
        description: "Select the theme to apply across your entire site",
        components: {
          Field: "~/payload/globals/SiteConfig/components/ActiveThemeField",
        },
      },
    },
    {
      label: "Theme Import",
      type: "collapsible",
      admin: {
        initCollapsed: true,
        components: {
          Field: "~/payload/globals/SiteConfig/components/ThemeImportField",
        },
      },
      fields: [
        {
          name: "importThemeCSS",
          type: "textarea",
          label: "Import Theme CSS",
          admin: {
            placeholder: "Paste your tweakcn theme CSS here...",
            description:
              "Paste CSS from tweakcn.com to import and activate a new theme",
          },
        },
        {
          name: "importedThemeName",
          type: "text",
          label: "Theme Name",
          admin: {
            placeholder: "My Custom Theme",
            description:
              "Name for the imported theme (optional - will auto-generate if empty)",
          },
        },
      ],
    },
  ],
};
```

### Custom Admin Components Structure

The SiteConfig folder will include custom admin components:

```
~/payload/globals/SiteConfig/
├── config.ts                    # SiteConfig global configuration
├── components/
│   ├── ActiveThemeField.tsx     # Custom activeTheme field component
│   └── ThemeImportField.tsx     # Custom theme import functionality
└── utils/
    ├── themeParser.ts           # CSS parsing utilities
    └── themeValidator.ts        # Theme validation functions
```

**ActiveThemeField.tsx**: Custom field that renders:

- Input showing currently applied theme name (if available)
- Custom search input below with paginated results from Themes collection
- Theme selection based on user's search query

**ThemeImportField.tsx**: Custom component handling:

- CSS paste functionality
- Theme parsing and validation
- Automatic theme creation and activation

### Themes Collection (No Changes)

The existing Themes collection remains unchanged and continues to serve as the theme storage mechanism:

- **name**: Theme identification
- **type**: user vs template (from THEME_TYPES)
- **author**: relationship to users
- **styles**: JSON with complete theme schema (light/dark modes, all CSS variables)

### TailwindConfig Global (No Changes)

The existing TailwindConfig global will remain unchanged. The new SiteConfig global will handle theme management independently without affecting the current TailwindConfig structure.

## Rationale

- **Clean separation of concerns** - Themes collection for storage, SiteConfig global for selection and management
- **Preserves existing architecture** - No changes needed to current Themes collection structure
- **Multiple theme support** - Users can have many themes but only one active at a time
- **Future-ready architecture** - Easy migration path when Sites collection is implemented
- **Leverages PayloadCMS versioning** - Built-in rollback capabilities for theme selection changes
- **User-friendly interface** - Simple dropdown to switch between themes
- **Scalable design** - Supports unlimited themes in collection with efficient active theme resolution

## Migration Strategy

### Phase 1: Create SiteConfig Global Structure

- **Create SiteConfig folder** - Set up `~/payload/globals/SiteConfig/` directory structure
- **Implement config.ts** - Create SiteConfig global configuration with custom admin components
- **Build custom components** - Develop ActiveThemeField and ThemeImportField admin components
- **Create utility functions** - Implement CSS parsing and theme validation utilities

### Phase 2: Create Default Theme (Optional)

- **Extract existing theme data** - Convert current TailwindConfig colorField values to Themes collection JSON format
- **Create default theme record** - Generate "Default UIFoundry Theme" in Themes collection with extracted data
- **Set as active theme** - Initialize SiteConfig global with default theme as activeTheme

### Phase 3: Deploy SiteConfig Global

- **Register global** - Add SiteConfig global to PayloadCMS globals index
- **Deploy admin interface** - Make SiteConfig available in PayloadCMS admin panel
- **Test custom components** - Verify ActiveThemeField search and ThemeImportField functionality work correctly

### Phase 4: Update Theme Resolution System

- **Create theme utilities** - Implement `getActiveTheme()` and `getActiveThemeStyles()` functions
- **Update CSS injection** - Modify existing style injection system to use active theme resolution instead of TailwindConfig
- **Test live preview** - Verify theme switching works with existing live preview system

### Phase 5: Validation & Testing

- **Component compatibility** - Ensure all existing blocks render correctly with new theme system
- **Theme import testing** - Verify CSS parsing creates valid Theme records and activates them
- **Performance testing** - Confirm theme resolution doesn't impact site performance

**Note**: TailwindConfig global remains unchanged throughout this process. The new system runs alongside existing theme infrastructure without breaking changes.
