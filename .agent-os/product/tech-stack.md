# Technical Stack

## Frontend Framework

- **Application Framework:** Next.js 15.4.2-canary.33
- **JavaScript Framework:** React 19.1.0
- **TypeScript:** 5.8.2 (strict mode enabled)
- **Import Strategy:** Node.js ES modules with `~/` alias for src directory

## Styling & UI

- **CSS Framework:** Tailwind CSS 4.0.15
- **UI Component Library:** Radix UI primitives with custom Shadcn components
- **Animation Library:** Motion 12.23.12 (Framer Motion successor)
- **Responsive Design:** Mobile-first approach with Tailwind utilities

## Backend & Database

- **CMS:** PayloadCMS 3.49.1 with MongoDB adapter
- **Database System:** MongoDB (Atlas cloud hosting)
- **API Layer:** TRPC 11.0.0 for type-safe client-server communication
- **Authentication:** Better Auth 1.3.2 with Google OAuth integration

## Documentation & Registry

- **Documentation Platform:** Fumadocs for interactive component and block documentation
- **Component Registry:** Custom shadcn registry for PayloadCMS components and blocks
- **Registry Distribution:** Components installable via `npx shadcn add --registry` command
- **Block Documentation:** Interactive examples and customization guides per component

## Development Tools

- **Package Manager:** pnpm 10.11.0
- **Linting:** ESLint 9.23.0 with Next.js config
- **Code Formatting:** Prettier 3.5.3 with Tailwind plugin
- **Testing:** Playwright for E2E testing, Vitest 3.2.4 for unit testing

## Infrastructure & Deployment

- **Application Hosting:** AWS via SST 3.17.10 (Next.js on Lambda/CloudFront)
- **Database Hosting:** MongoDB Atlas
- **Asset Hosting:** AWS S3 with CloudFront CDN
- **Deployment Solution:** SST with automated CI/CD via GitHub Actions
- **Domain Management:** AWS Route 53 with SSL certificates

## Media & Assets

- **Image Processing:** Sharp 0.34.1 for optimization
- **File Storage:** S3 with PayloadCMS storage adapter
- **Icon Library:** Lucide React 0.525.0
- **Fonts Provider:** System fonts with Tailwind font stacks

## Development Environment

- **Runtime:** Node.js 22.x (AWS Lambda runtime)
- **Build Tool:** Next.js built-in bundler with Turbopack
- **Environment Management:** SST secrets and environment variables
- **Monitoring:** AWS CloudWatch with SST console integration

## Component Distribution

- **Registry Structure:** PayloadCMS blocks, fields, and UI components organized by category
- **Registry Schema:** Follows shadcn registry specification with custom extensions
- **Component Types:** Blocks (Hero, Features, etc.), Fields (Color, Upload, etc.), UI Components
- **Distribution Method:** Public registry hosted at registry URL for external projects

## Code Repository

- **Repository URL:** https://github.com/ianyimi/uifoundry
- **Branching Strategy:** main (production), dev (staging), feature branches
- **CI/CD:** Automated deployment on branch pushes with E2E testing

## Quality Assurance

- **Type Safety:** Full TypeScript coverage from database to frontend
- **Code Standards:** ESLint + Prettier with automated formatting
- **Performance:** Core Web Vitals optimization and monitoring
- **Security:** Environment variable validation and secret management
