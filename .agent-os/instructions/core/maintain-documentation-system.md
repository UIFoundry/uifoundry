# Maintain Documentation System

⚠️ **ESSENTIAL AGENT RESPONSIBILITY**: This documentation system requires active maintenance to prevent drift and ensure accuracy.

## Auto-Update Protocol for Registry Changes

### When Adding New Components

**EVERY agent adding components to the registry MUST complete ALL steps below:**

#### 1. Create Component Documentation

- Follow the 5-section template in `.agent-os/standards/documentation-template.md`
- Place in correct category: `/docs/[blocks|fields|globals|ui|lib]/[component-name].mdx`
- Use exact component name from registry.json

#### 2. Update Registry Mapping File

**File**: `.agent-os/standards/registry-mapping.md`

Add entries for:

- **Registry Dependencies**: New `@uifoundry/*` components → doc paths
- **NPM Dependencies**: New packages → GitHub links
- **Component Descriptions**: Standardized descriptions for consistency

Example additions:

```markdown
### UIFoundry Custom Components (@uifoundry/\*)

- `@uifoundry/new-component` → `/docs/ui/new-component`

### NPM Dependencies

- `new-package` → `https://github.com/owner/new-package`

### Component Descriptions

- `@uifoundry/new-component`: Brief description of what it does
```

#### 3. Update Documentation Checklist

**File**: `.agent-os/instructions/core/component-documentation-checklist.md`

Add new dependencies to "Common Dependencies Quick Reference":

```markdown
### Registry Dependencies

- `@uifoundry/new-component` → "Description of component"

### NPM Dependencies

- `new-package` → "Description of package"
```

#### 4. Verify System Consistency

- Check that all registry dependencies have documentation paths
- Check that all NPM dependencies have GitHub links
- Ensure descriptions are consistent and helpful

### When Updating Existing Components

If you modify existing components:

- Update the component's documentation file
- Update dependency mappings if dependencies changed
- Update common dependencies list if new patterns emerge

## Why This Matters

**Without this maintenance:**

- Future agents won't know how to map new dependencies
- Documentation will become inconsistent
- Auto-generation will fail for new components
- The documentation system will decay over time

**With proper maintenance:**

- New components get accurate documentation automatically
- Dependency mapping stays current
- Documentation quality remains consistent
- System scales effortlessly with new additions

## Validation Checklist

Before completing work on new components, verify:

- [ ] Component documentation exists and follows 5-section template
- [ ] Registry mapping file updated with new dependencies
- [ ] Documentation checklist updated with new common dependencies
- [ ] All links in documentation work correctly
- [ ] Descriptions are consistent with established patterns

## File Hierarchy for Quick Reference

```
.agent-os/
├── standards/
│   ├── documentation-template.md          # 5-section template
│   └── registry-mapping.md                # Dependency → docs/links mapping
├── instructions/core/
│   ├── component-documentation-checklist.md  # Quality checklist
│   ├── update-component-docs.md              # Update procedures
│   └── maintain-documentation-system.md      # This file
```

**Remember**: A few minutes of maintenance now saves hours of confusion later. Keep the system updated!
