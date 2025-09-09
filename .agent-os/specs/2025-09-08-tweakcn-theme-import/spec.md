# Spec Requirements Document

> Spec: tweakcn-theme-import
> Created: 2025-09-08

## Overview

Implement the ability to import custom shadcn/ui themes generated from tweakcn.com into UIFoundry sites by creating a new SiteConfig global that manages theme selection and import functionality. This feature leverages the existing Themes collection for theme storage while providing a clean interface for users to import, manage, and activate themes across their site.

## User Stories

### Theme Import for Site Customization

As a UIFoundry user, I want to import custom themes from tweakcn, so that I can quickly apply professional color schemes to my site without manually configuring each color variable.

Users can paste tweakcn-generated CSS theme code directly into the new SiteConfig global, which will parse the CSS variables using regex patterns and automatically create a new Theme record in the existing Themes collection. The newly created theme is automatically set as the active site theme, providing immediate visual changes through the live preview system. Users can then switch between multiple themes via a simple dropdown interface in the SiteConfig global.

### Theme Management and Rollback

As a site administrator, I want to manage and revert theme changes, so that I can safely experiment with different themes without losing my original configuration.

The system allows users to maintain multiple themes in the Themes collection while only one theme is active at a time through the SiteConfig global. Users can easily switch between themes, import new themes, and manage their theme library. All theme data is stored in the existing Themes collection structure, and theme selection is versioned through PayloadCMS's built-in versioning system.

## Spec Scope

1. **SiteConfig Global Creation** - Create new SiteConfig global with activeTheme relationship to Themes collection
2. **CSS Theme Import** - Import tweakcn theme CSS code via textarea in SiteConfig global interface
3. **CSS Parsing & Theme Creation** - Parse CSS variables using regex and create new Theme records automatically
4. **Active Theme Management** - Single active theme selection with dropdown interface for easy switching
5. **Light/Dark Mode Support** - Handle both light and dark theme variants from tweakcn in Theme records
6. **Theme Library Management** - Allow multiple themes to exist in collection with single active theme

## Out of Scope

- Direct URL import from tweakcn.com (future enhancement)
- Per-page or per-block theme overrides
- Theme marketplace or sharing features
- Custom theme creation tools within UIFoundry
- Multi-site theme management (future Sites collection will handle this)
- Modifications to the existing Themes collection structure

## Expected Deliverable

1. Users can successfully paste tweakcn CSS theme code into the SiteConfig global and see immediate visual changes reflected in the live preview
2. All existing blocks and components render correctly with imported and activated themes without visual or functional issues
3. Users can switch between multiple themes via dropdown selection in SiteConfig global with immediate visual feedback
4. Theme import process creates new Theme records automatically and sets them as the active theme
