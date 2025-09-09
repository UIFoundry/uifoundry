# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-09-08-tweakcn-theme-import/spec.md

## Changes

### TailwindConfig Global Extensions

Add new fields to the existing TailwindConfig global to support theme import functionality:

```typescript
// Add to TailwindConfig global fields array
{
  label: "Theme Import",
  type: "collapsible",
  admin: {
    initCollapsed: true,
  },
  fields: [
    {
      name: "importThemeCSS",
      type: "textarea",
      label: "Import Theme CSS",
      admin: {
        placeholder: "Paste your tweakcn theme CSS here...",
        description: "Paste CSS from tweakcn.com to import custom theme colors",
      },
    },
    {
      name: "themeImportHistory",
      type: "group",
      label: "Import History",
      fields: [
        {
          name: "lastImportedAt",
          type: "date",
          label: "Last Import Date",
        },
        {
          name: "importSource",
          type: "text",
          label: "Import Source",
          defaultValue: "tweakcn",
        },
        {
          name: "originalThemeBackup",
          type: "json",
          label: "Original Theme Backup",
          admin: {
            description: "Backup of theme colors before last import",
          },
        },
      ],
    },
  ],
}
```

## Rationale

- **No new collections needed** - Extends existing TailwindConfig global structure
- **Leverages PayloadCMS versioning** - Built-in rollback capabilities through versions
- **Minimal data impact** - Adds only essential fields for import functionality
- **Backward compatibility** - New fields are optional and don't affect existing sites
- **Import tracking** - Stores metadata for debugging and rollback without complex relationships

## Migration Strategy

- **Zero-downtime deployment** - New fields are optional with sensible defaults
- **Existing data preserved** - No modifications to current TailwindConfig data
- **Gradual adoption** - Feature available immediately without requiring data migration
