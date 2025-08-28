# Spec Tasks

## Tasks

- [x] 1. Set up Registry Infrastructure and Dependencies
  - [x] 1.1 Install required dependencies (@shadcn/ui, react-syntax-highlighter)
  - [x] 1.2 Create registry folder structure under `/registry/` for component files
  - [x] 1.3 Set up API route handlers under `/api/registry/`
  - [x] 1.4 Create TypeScript interfaces for registry component definitions
  - [x] 1.5 Implement basic registry index endpoint `/api/registry/index.json`

- [x] 2. Component Definition System and File Management
  - [x] 2.1 Create component metadata schema with validation
  - [x] 2.2 Implement file content management system for component storage
  - [x] 2.3 Build dependency resolution system for npm and registry dependencies
  - [x] 2.4 Create component definition generator from existing payload blocks
  - [x] 2.5 Implement individual component endpoint `/api/registry/[component].json`
  - [x] 2.6 Add Tailwind config injection for component-specific styles

- [ ] 3. Convert Existing UIFoundry Blocks to Registry Components
  - [ ] 3.1 Analyze existing payload blocks structure and dependencies
  - [ ] 3.2 Create conversion scripts for Hero block variants
  - [ ] 3.3 Convert Features, CTA, and FAQ blocks to registry format
  - [ ] 3.4 Convert remaining blocks (Pricing, Teams, Stats, Gallery, etc.)
  - [ ] 3.5 Generate proper TypeScript interfaces for all converted components
  - [x] 3.6 Validate component dependencies and import paths

- [ ] 4. Build Web Interface for Component Discovery
  - [x] 4.1 Create Next.js pages under `/app/registry/` route structure
  - [x] 4.2 Build component listing page with search and filtering
  - [ ] 4.3 Implement individual component preview pages with live examples
        ⚠️ Blocking issue: Many registry components are not yet converted or typed; live rendering is unsafe until tasks 3.3–3.5 complete for all components.
  - [x] 4.4 Add syntax highlighting for component source code display
  - [x] 4.5 Create installation instructions and CLI command generation
  - [x] 4.6 Implement responsive design and proper SEO optimization

- [ ] 5. CLI Integration and Registry Compatibility Testing
  - [ ] 5.1 Test component installation via `npx shadcn add --registry` command
  - [ ] 5.2 Verify dependency resolution and file placement accuracy
  - [ ] 5.3 Test component discovery through CLI listing commands
  - [ ] 5.4 Validate Tailwind config merging and CSS generation
  - [ ] 5.5 Implement version management and backward compatibility
  - [ ] 5.6 Add registry health checks and error handling
