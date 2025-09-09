# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-09-08-tweakcn-theme-import/spec.md

## Technical Requirements

### SiteConfig Global Creation

- **NEW GLOBAL**: Create SiteConfig global at `~/payload/globals/SiteConfig/config.ts` for theme management alongside existing TailwindConfig
- Add activeTheme relationship field pointing to Themes collection with custom admin component
- Implement theme import functionality within SiteConfig global using custom admin components
- Integrate with existing live preview system using active theme resolution
- Create folder structure: `~/payload/globals/SiteConfig/` with config, components, and utils subdirectories

### Custom Admin Components Development

- **ActiveThemeField.tsx**: Custom field component for activeTheme relationship
  - Render input showing currently applied theme name (if available)
  - Implement custom search input with paginated results from Themes collection
  - Enable theme selection based on user's search query
  - Handle theme switching with immediate live preview updates
- **ThemeImportField.tsx**: Custom collapsible field component for theme import
  - Handle CSS paste functionality with textarea input
  - Process theme parsing and validation in real-time
  - Manage automatic theme creation and activation workflow
  - Provide user feedback during import process

### CSS Theme Import & Processing

- Implement CSS parser using regex patterns in `~/payload/globals/SiteConfig/utils/themeParser.ts`
- Parse both light and dark mode CSS variables from multiple selector formats:
  - `:root { --color-background: value; }`
  - `.dark { --color-background: value; }`
  - `[data-theme="dark"] { --color-background: value; }`
- Create validation function in `~/payload/globals/SiteConfig/utils/themeValidator.ts`
- Map parsed CSS values to existing Themes collection JSON schema structure
- Generate automatic theme names (e.g., "Imported Theme - [timestamp]") if not provided

### Theme Management System

- Create new Theme record automatically when CSS is imported through ThemeImportField component
- Set newly imported theme as the activeTheme in SiteConfig automatically
- Provide custom search interface for switching between existing themes via ActiveThemeField component
- Allow users to manage multiple themes in Themes collection while maintaining single active theme
- Implement paginated theme search to handle large numbers of themes efficiently

### Theme Resolution & Application

- Build theme resolution utilities in `~/payload/utils/theme.ts` to get active theme from SiteConfig
- Create `getActiveTheme()` and `getActiveThemeStyles()` utility functions for theme data retrieval
- Update existing CSS variable injection system to use active theme alongside TailwindConfig
- Ensure live preview updates immediately when active theme changes through SiteConfig global
- Support both light and dark mode theme variants from active theme
- Maintain compatibility with existing TailwindConfig-based styling during transition period

### Data Processing & Validation

- Implement CSS format validation (hex, hsl, oklch, CSS variables) in themeValidator.ts utility
- Create comprehensive error handling for malformed or incomplete CSS input with user-friendly messages
- Parse only theme properties that have corresponding matches in the pasted CSS
- Leverage existing Themes collection validation and JSON schema from `~/payload/constants/themes.ts`
- Preserve theme structure consistency with existing Themes collection
- Validate against existing `jsonSchema` structure (light/dark modes with all required properties)

### Migration & Integration

- Create optional migration utility to convert existing TailwindConfig data to default Theme record
- Update existing CSS injection components to use active theme resolution alongside TailwindConfig
- Ensure backward compatibility with existing component implementations during transition
- **TailwindConfig global remains unchanged** - new system runs in parallel
- Set up architecture ready for future Sites collection integration
- Register SiteConfig global in PayloadCMS globals index
- Test custom admin components with existing live preview system

## External Dependencies

No new external dependencies required. The feature will use existing project dependencies:

- **PayloadCMS** - For global creation, custom admin components, relationship fields, and data persistence
- **React** - For custom admin component development (ActiveThemeField, ThemeImportField)
- **Existing Themes collection** - For theme storage using current schema structure without modifications
- **Existing theme constants** - From `~/payload/constants/themes.ts` for schema validation and consistency
- **Current live preview system** - Will be extended to work with active theme resolution from SiteConfig
- **Existing TailwindConfig global** - Will remain unchanged and work alongside new theme system
