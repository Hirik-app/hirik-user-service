# Technical Stack

> Last Updated: 2025-07-30
> Version: 1.0.0

## Application Framework
- **Framework:** Hono.js v4.8.10
- **Runtime:** Cloudflare Workers
- **Language:** TypeScript with strict type checking

## Database Systems
- **Primary Database:** PostgreSQL (managed hosting)
- **Edge Database:** Cloudflare D1 (SQLite-compatible)
- **ORM:** Prisma v6.13.0 with driver adapters
- **Adapter:** @prisma/adapter-d1 for edge database integration

## JavaScript Framework
- **Mobile Framework:** React Native 0.78/0.80
- **State Management:** Redux Toolkit with RTK Query
- **Navigation:** React Navigation (Stack, Tab, Bottom Tab)

## Import Strategy
- **Strategy:** Node.js modules (ESM)
- **Package Manager:** npm
- **Module Type:** ES Modules (type: "module")

## CSS Framework
- **Web:** Custom styling within Hono.js services
- **Mobile:** React Native StyleSheet with custom design system
- **Fonts:** Gilroy font family integration

## UI Component Library
- **Mobile:** Custom React Native components
- **Icons:** Lucide React Native and Vector Icons
- **UI Patterns:** Custom design system implementation

## Fonts Provider
- **Provider:** Custom font integration
- **Primary Font:** Gilroy font family
- **Loading Strategy:** Bundled with mobile applications

## Icon Library
- **Library:** Lucide React Native
- **Secondary:** React Native Vector Icons
- **Implementation:** Tree-shaken imports for optimal bundle size

## Application Hosting
- **Platform:** Cloudflare Workers (serverless edge computing)
- **Deployment:** Wrangler CLI v4.26.1
- **Environment:** Global edge network with smart placement
- **Observability:** Cloudflare Workers Analytics enabled

## Database Hosting
- **D1 Database:** Cloudflare managed SQLite-compatible edge database
- **PostgreSQL:** Managed PostgreSQL hosting (separate services)
- **Migrations:** Prisma migrate for schema evolution
- **Backups:** Automated database backup strategies

## Asset Hosting
- **Provider:** Cloudflare R2 (object storage)
- **CDN:** Cloudflare global CDN
- **Access:** Signed URLs for secure document access

## Deployment Solution
- **Workers:** Wrangler CLI with automated deployment
- **Mobile Apps:** React Native build tools (Android/iOS)
- **CI/CD:** Git-based deployment workflows
- **Environment Management:** Wrangler secrets and environment variables

## Additional Infrastructure
- **Search Engine:** Meilisearch for fast, typo-tolerant search
- **Message Queues:** Cloudflare Queues for asynchronous processing
- **Real-Time Communication:** Cloudflare Durable Objects for WebSocket management
- **Authentication:** JWT-based with Hono JWT middleware
- **Password Hashing:** bcryptjs for secure credential storage
- **Local Storage:** AsyncStorage for mobile app persistence

## Development Tools
- **TypeScript Compiler:** Latest with strict configuration
- **Development Server:** Wrangler dev with hot reload
- **Database Tools:** Prisma Studio for database management
- **Environment Configuration:** dotenv-cli for local development
- **Type Generation:** Wrangler types for Cloudflare bindings

## Code Repository
- **Repository URL:** /Users/admin/hirik/new-v2/hirik-backend/hirik-user-service
- **Version Control:** Git
- **Branch Strategy:** Feature-based development workflow