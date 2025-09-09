# Spec Requirements Document

> Spec: tweakcn-theme-import
> Created: 2025-09-08

## Overview

Implement the ability to import custom shadcn/ui themes generated from tweakcn.com into UIFoundry sites by pasting CSS theme code directly into the admin interface. This feature will allow developers and users to customize their site appearance using professionally designed themes while maintaining compatibility with the existing block system.

## User Stories

### Theme Import for Site Customization

As a UIFoundry user, I want to import custom themes from tweakcn, so that I can quickly apply professional color schemes to my site without manually configuring each color variable.

Users can paste tweakcn-generated CSS theme code directly into a textarea field in the PayloadCMS admin panel, which will parse the CSS variables using regex patterns and automatically populate the corresponding shadcn/ui color fields in the existing TailwindConfig global. The system validates the parsed theme data for compatibility and provides immediate visual preview before applying changes, ensuring seamless integration with all existing blocks and components.

### Theme Management and Rollback

As a site administrator, I want to manage and revert theme changes, so that I can safely experiment with different themes without losing my original configuration.

The system stores the original theme configuration as a backup and tracks import history, allowing users to preview imported themes, apply them with confidence, and roll back to previous configurations if needed. All theme changes are versioned through PayloadCMS's built-in versioning system.

## Spec Scope

1. **CSS Theme Import** - Import tweakcn theme CSS code via textarea in PayloadCMS admin interface
2. **CSS Parsing & Validation** - Parse CSS variables using regex and validate against shadcn/ui color schema
3. **Live Preview Integration** - Extend existing TailwindConfig live preview to show imported theme
4. **Color Mapping** - Map parsed CSS variables to existing TailwindConfig color fields
5. **Import History Tracking** - Store import metadata and backup original configurations

## Out of Scope

- Direct URL import from tweakcn.com (future enhancement)
- Per-page or per-block theme overrides
- Theme marketplace or sharing features
- Custom theme creation tools within UIFoundry
- Migration of themes between different UIFoundry sites

## Expected Deliverable

1. Users can successfully paste tweakcn CSS theme code into the PayloadCMS admin panel and see immediate visual changes reflected in the live preview
2. All existing blocks and components render correctly with imported themes without visual or functional issues
3. Theme import process includes validation, preview, and rollback capabilities accessible through the TailwindConfig global interface
