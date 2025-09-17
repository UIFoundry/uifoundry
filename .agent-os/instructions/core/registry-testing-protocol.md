# Registry Testing Protocol

## Two-Phase Testing Strategy for Registry Components

This protocol ensures registry components work correctly both in isolation (CLI installation) and in practice (browser functionality).

### Phase 1: CLI Installation Testing

**Purpose**: Verify the component can be installed via shadcn CLI without errors

**Process**:

```bash
# Test installation from UIFoundry registry
npx shadcn@latest add @uifoundry/[component-name]
```

**Verification Points**:

- [ ] Component installs without errors
- [ ] All dependencies resolve correctly
- [ ] No import errors or missing dependencies
- [ ] Files are placed in correct locations per components.json config

### Phase 2: Browser Functional Testing

**Purpose**: Validate component renders and functions correctly in the live application

**Prerequisites**:

- Dev server running on localhost:3001 (never needs to be started/stopped by agents)
- HMR (Hot Module Replacement) active for real-time updates

#### Browser Testing Workflow

1. **Initial Navigation**

   ```typescript
   playwright_browser_navigate("http://localhost:3001");
   playwright_browser_snapshot(); // Capture initial state
   ```

2. **Component Page Testing**
   - Navigate to pages containing the new component
   - Take snapshots to verify visual rendering
   - Check for proper layout and styling

3. **Interaction Testing**

   ```typescript
   // Test interactive elements
   playwright_browser_click({
     element: "component button",
     ref: "[data-testid='component-action']",
   });

   // Test form inputs if applicable
   playwright_browser_type({
     element: "input field",
     ref: "input[name='field-name']",
     text: "test input",
   });
   ```

4. **Console Error Checking**

   ```typescript
   playwright_browser_console_messages(); // Check for JavaScript errors
   ```

5. **Responsive Testing**
   ```typescript
   // Test different screen sizes
   playwright_browser_resize({ width: 1920, height: 1080 }); // Desktop
   playwright_browser_resize({ width: 768, height: 1024 }); // Tablet
   playwright_browser_resize({ width: 375, height: 667 }); // Mobile
   ```

#### Specific Testing Routes

**For Different Component Types**:

- **Blocks**: Test on pages where blocks are used (likely home page, content pages)
- **Fields**: Test in PayloadCMS admin panel at `localhost:3001/admin`
- **Globals**: Test global components (headers, footers) across multiple pages
- **UI Components**: Test in relevant application contexts

#### Critical Validation Points

**Visual Validation**:

- [ ] Component renders without visual errors or broken layouts
- [ ] Styling matches design expectations
- [ ] Component is responsive across screen sizes
- [ ] No missing images or broken assets

**Functional Validation**:

- [ ] All interactive elements work (buttons, forms, links)
- [ ] Component state management functions correctly
- [ ] Data flows work as expected
- [ ] No JavaScript errors in console

**Integration Validation**:

- [ ] Component integrates seamlessly with existing UI patterns
- [ ] HMR updates work when component files are modified
- [ ] Component doesn't break existing page functionality
- [ ] Performance remains acceptable (no significant slowdowns)

### Testing Automation Script Template

```typescript
// Complete registry component testing flow
async function testRegistryComponent(
  componentName: string,
  testRoutes: string[],
) {
  // Phase 1: CLI Installation (bash)
  await bash(`npx shadcn@latest add @uifoundry/${componentName}`);

  // Phase 2: Browser Testing
  await playwright_browser_navigate("http://localhost:3001");

  for (const route of testRoutes) {
    await playwright_browser_navigate(`http://localhost:3001${route}`);
    await playwright_browser_snapshot();

    // Check for console errors
    const messages = await playwright_browser_console_messages();
    // Validate no errors in messages

    // Test component-specific interactions
    // ... component-specific testing logic
  }

  // Test responsive design
  const screenSizes = [
    { width: 1920, height: 1080 },
    { width: 768, height: 1024 },
    { width: 375, height: 667 },
  ];

  for (const size of screenSizes) {
    await playwright_browser_resize(size);
    await playwright_browser_snapshot();
  }
}
```

### Integration with Agent Workflow

**Registry Porter Agent Responsibilities**:

1. Execute CLI installation testing
2. Perform browser functional testing
3. Document any issues found
4. Ensure component passes all validation points before marking complete

**Testing Failure Handling**:

- If CLI installation fails: Fix import paths and dependencies
- If browser testing fails: Debug component implementation and styling
- Document all issues and resolutions for future reference

### Benefits of This Approach

1. **Comprehensive Coverage**: Tests both installation and functionality
2. **Real-world Validation**: Uses actual browser environment user will experience
3. **HMR Integration**: Leverages live development server for immediate feedback
4. **Automated Workflow**: Can be scripted and repeated consistently
5. **Visual Verification**: Captures screenshots for manual review if needed

This protocol ensures registry components meet the same quality standards as manually tested components while providing automation for agent workflows.
