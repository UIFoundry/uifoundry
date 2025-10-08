# Spec Tasks

## Tasks

- [ ] 1. Create SiteConfig Global Foundation
  - [ ] 1.1 Write tests for SiteConfig global structure and field validation
  - [ ] 1.2 Create SiteConfig folder structure at `~/payload/globals/SiteConfig/`
  - [ ] 1.3 Implement basic SiteConfig global config at `~/payload/globals/SiteConfig/config.ts`
  - [ ] 1.4 Add activeTheme relationship field with basic admin configuration
  - [ ] 1.5 Register SiteConfig global in PayloadCMS globals index
  - [ ] 1.6 Create initial theme resolution utilities at `~/payload/utils/theme.ts`
  - [ ] 1.7 Verify SiteConfig global appears in admin panel and basic tests pass

- [ ] 2. Implement CSS Theme Parser and Validator
  - [ ] 2.1 Write comprehensive tests for CSS parsing functionality (light/dark modes, multiple selector formats)
  - [ ] 2.2 Create `themeParser.ts` utility in `~/payload/globals/SiteConfig/utils/`
  - [ ] 2.3 Implement regex patterns for extracting CSS custom properties from multiple formats
  - [ ] 2.4 Create `themeValidator.ts` utility for validating parsed theme data against Themes schema
  - [ ] 2.5 Add error handling for malformed CSS input with user-friendly messages
  - [ ] 2.6 Implement automatic theme name generation (e.g., "Imported Theme - [timestamp]")
  - [ ] 2.7 Verify all CSS parsing and validation tests pass

- [ ] 3. Build Custom Admin Components
  - [ ] 3.1 Write tests for ActiveThemeField component functionality and user interactions
  - [ ] 3.2 Create `ActiveThemeField.tsx` component in `~/payload/globals/SiteConfig/components/`
  - [ ] 3.3 Implement current theme display input and paginated search interface
  - [ ] 3.4 Add theme selection functionality with live preview integration
  - [ ] 3.5 Create `ThemeImportField.tsx` component for CSS import functionality
  - [ ] 3.6 Integrate CSS parser and validator utilities into ThemeImportField
  - [ ] 3.7 Add real-time validation feedback and import progress indicators
  - [ ] 3.8 Update SiteConfig global to use custom admin components
  - [ ] 3.9 Verify custom components render correctly and all interaction tests pass

- [ ] 4. Integrate Theme Management System
  - [ ] 4.1 Write tests for Theme record creation and activeTheme updates
  - [ ] 4.2 Implement automatic Theme record creation from parsed CSS data
  - [ ] 4.3 Add functionality to set newly imported theme as activeTheme automatically
  - [ ] 4.4 Update CSS variable injection system to use active theme resolution
  - [ ] 4.5 Integrate with existing live preview system for immediate theme changes
  - [ ] 4.6 Test theme switching between multiple themes via ActiveThemeField
  - [ ] 4.7 Ensure compatibility with existing TailwindConfig-based components
  - [ ] 4.8 Verify complete theme management workflow and all integration tests pass

- [ ] 5. End-to-End Testing and Documentation
  - [ ] 5.1 Write comprehensive integration tests for complete import workflow
  - [ ] 5.2 Test CSS import from tweakcn.com with various theme formats
  - [ ] 5.3 Verify all existing blocks render correctly with imported themes
  - [ ] 5.4 Test performance with multiple themes and paginated search
  - [ ] 5.5 Create migration utility for converting TailwindConfig to default theme (optional)
  - [ ] 5.6 Update documentation for theme import and management workflow
  - [ ] 5.7 Test live preview functionality with theme switching
  - [ ] 5.8 Verify all tests pass and feature meets spec requirements
