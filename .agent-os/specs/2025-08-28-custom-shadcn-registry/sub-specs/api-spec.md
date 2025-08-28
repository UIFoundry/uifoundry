# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-08-28-custom-shadcn-registry/spec.md

## Endpoints

### GET /api/registry/index.json

**Purpose:** Provide the main registry index with all available components for shadcn CLI discovery
**Parameters:** None
**Response:** JSON array of component objects with name, type, files, and dependencies
**Errors:** 500 for server errors, 404 if registry not found

```json
[
  {
    "name": "hero-1",
    "type": "components:block",
    "dependencies": ["@radix-ui/react-slot"],
    "devDependencies": [],
    "registryDependencies": ["button"],
    "files": ["hero-1.tsx"]
  }
]
```

### GET /api/registry/[component].json

**Purpose:** Provide specific component definition with file contents and metadata for shadcn CLI installation
**Parameters:** component (string) - component name from the registry
**Response:** JSON object with component details, files array with content, and all dependencies
**Errors:** 404 if component not found, 500 for server errors

```json
{
  "name": "hero-1",
  "type": "components:block",
  "files": [
    {
      "name": "hero-1.tsx",
      "content": "// Component TypeScript code content"
    }
  ],
  "dependencies": ["@radix-ui/react-slot"],
  "devDependencies": [],
  "registryDependencies": ["button"],
  "tailwind": {
    "config": {
      "theme": {
        "extend": {}
      }
    }
  }
}
```

### GET /api/registry/components

**Purpose:** List all components with metadata for web interface display
**Parameters:** Optional query params: type, category for filtering
**Response:** JSON array of components with additional metadata like description, preview image
**Errors:** 500 for server errors

### GET /api/registry/components/[component]

**Purpose:** Get detailed component information for web interface including usage examples
**Parameters:** component (string) - component name
**Response:** JSON object with component details, usage examples, and preview data
**Errors:** 404 if component not found, 500 for server errors
