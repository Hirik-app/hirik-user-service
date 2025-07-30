# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Agent OS Documentation

### Product Context
- **Mission & Vision:** @.agent-os/product/mission.md
- **Technical Architecture:** @.agent-os/product/tech-stack.md
- **Development Roadmap:** @.agent-os/product/roadmap.md
- **Decision History:** @.agent-os/product/decisions.md

### Development Standards
- **Code Style:** @~/.agent-os/standards/code-style.md
- **Best Practices:** @~/.agent-os/standards/best-practices.md

### Project Management
- **Active Specs:** @.agent-os/specs/
- **Spec Planning:** Use `@~/.agent-os/instructions/create-spec.md`
- **Tasks Execution:** Use `@~/.agent-os/instructions/execute-tasks.md`

## Workflow Instructions

When asked to work on this codebase:

1. **First**, check @.agent-os/product/roadmap.md for current priorities
2. **Then**, follow the appropriate instruction file:
   - For new features: @.agent-os/instructions/create-spec.md
   - For tasks execution: @.agent-os/instructions/execute-tasks.md
3. **Always**, adhere to the standards in the files listed above

## Important Notes

- Product-specific files in `.agent-os/product/` override any global standards
- User's specific instructions override (or amend) instructions found in `.agent-os/specs/...`
- Always adhere to established patterns, code style, and best practices documented above.

## Service-Specific Context

This is the **hirik-user-service** - the authentication and user profile management service in the Hirik Platform. Key implementation details:

### Architecture Patterns
- **Cloudflare Workers** with Hono.js framework
- **Dual Database Strategy:** D1 for edge user data + PostgreSQL references
- **Modular Structure:** auth-module, user-module, profile-module
- **JWT Authentication:** Short-lived access tokens with refresh token rotation

### Database Strategy
- **Cloudflare D1:** User profiles, preferences, saved jobs (edge performance)
- **PostgreSQL References:** Logical references to skills, companies, job roles via string IDs
- **Prisma ORM:** With D1 adapter for edge database operations
- **No Foreign Keys:** Cross-database relationships use logical string references

### Key Features Implemented
- Phone-based OTP authentication with JWT tokens
- User profile management with education and experience
- Recruiter profile system with verification workflow
- Notification and job search preferences
- Saved jobs functionality with cross-service references

### Development Commands
```bash
npm run dev              # Wrangler dev server
npm run deploy           # Deploy to Cloudflare
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:studio        # Prisma Studio
```

### Authentication Flow
1. Phone + country code submitted to `/auth/login`
2. OTP generated and stored in D1 database
3. User verifies OTP via `/auth/verify-otp`
4. JWT access/refresh tokens returned
5. All routes except `/health` require valid JWT via middleware

### Key Dependencies
- `hono` - Web framework optimized for Workers
- `@prisma/client` + `@prisma/adapter-d1` - Database ORM with D1 support
- `bcryptjs` - Password hashing (for future features)
- `murmurhash` - Consistent hashing utilities