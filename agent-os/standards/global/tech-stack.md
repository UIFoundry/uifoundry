# Tech Stack

## Context

Global tech stack defaults for Agent OS projects, overridable in project-specific `.agent-os/product/tech-stack.md`.

- App Framework: Nextjs 15.4.2-canary.33
- Language: Typescript
- Primary Database: MongoDB
- ORM: PayloadCMS & mongodb aggregation language, if necessary
- JavaScript Framework: React ^19.0.0
- Unit Testing: Vitest
- E2E Testing: Playwright
- Build Tool: Webpack (payload & nextjs)
- Import Strategy: Node.js modules
- Package Manager: pnpm
- Node Version: 22 LTS
- CSS Framework: TailwindCSS 4.0+
- UI Components: Shadcn Components latest
- UI Installation: Via shadcn cli
- Icons: Lucide React components
- Application Hosting: AWS via sst (~/sst.config.ts)
- Hosting Region: us-west-1
- Database Hosting: Mongo Atlas
- Database Backups: none yet
- Asset Storage: Amazon S3
- CDN: CloudFront
- Asset Access: Private with signed URLs
- CI/CD Platform: AWS Cloudformation via sst autodeploy
- CI/CD Trigger: Push to master/dev branches
- Tests: Automatically Run in CI/CD (Vitest & Playwright)
- Production Environment: master branch
- Staging Environment: dev branch
