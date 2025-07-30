# Product Roadmap

> Last Updated: 2025-07-30
> Version: 1.0.0
> Status: Planning

## Phase 0: Already Completed

The following features have been implemented:

- [x] **Phone-Based Authentication** - OTP verification system with JWT token generation `L`
- [x] **User Management** - User creation, lookup, and profile association `M`
- [x] **Database Architecture** - Dual database strategy with D1 and PostgreSQL via Prisma `XL`
- [x] **Modular Service Architecture** - Auth, user, and profile modules with separate controllers `L`
- [x] **JWT Middleware** - Route protection and token validation system `M`
- [x] **Profile Management Foundation** - Database schema for comprehensive user profiles `L`
- [x] **Cloudflare Workers Integration** - Production-ready serverless deployment configuration `M`
- [x] **Development Tooling** - Wrangler configuration, Prisma setup, and migration system `S`

## Phase 1: Profile Management Enhancement (3-4 weeks) ✅ COMPLETED

**Goal:** Complete user profile functionality with full CRUD operations
**Success Criteria:** Users can create, view, update profiles with education and experience

### Must-Have Features

- [x] **Profile Creation API** - Complete profile onboarding workflow with validation `L`
- [x] **Education Management** - Add, edit, remove education entries with validation `M`
- [x] **Experience Management** - Work history CRUD operations (fixed typo) `M`
- [x] **Skill Association** - Link user profiles to skills from PostgreSQL `S`
- [x] **Profile Validation** - Zod schemas for input validation and data integrity `S`

### Should-Have Features

- [ ] **Profile Picture Upload** - Image handling via Cloudflare R2 integration `M`
- [ ] **CV Upload** - Document storage and retrieval system `M`

### Dependencies

- Integration with job-service for skill references
- Cloudflare R2 configuration for file storage

## Phase 2: User Preferences and Settings (2-3 weeks) ✅ COMPLETED

**Goal:** Enable user customization and job search preferences
**Success Criteria:** Users can configure notifications and job search criteria

### Must-Have Features

- [x] **Job Search Preferences** - Salary, location, role preferences CRUD with validation `L`
- [x] **Notification Settings** - Email and push notification with queue processing placeholder `M`
- [x] **Saved Jobs Management** - Save and retrieve job postings with full CRUD `S`
- [x] **FCM Token Management** - FCM token CRUD operations for push notifications `S`

### Dependencies

- Integration with job-service for job data
- Mobile app FCM configuration

## Phase 3: Advanced Authentication Features (2 weeks) ✅ COMPLETED

**Goal:** Enhance security and user experience in authentication
**Success Criteria:** Robust authentication with improved UX and security

### Must-Have Features

- [x] **OTP Rate Limiting** - Intelligent throttling with lockout mechanisms `M`
- [x] **SMS Service Integration** - Enhanced SMS integration ready for provider `L`
- [x] **Token Refresh Optimization** - Token rotation and security improvements `S`
- [x] **Security Logging** - Comprehensive audit trail for all auth events `S`

### Dependencies

- SMS service provider selection and integration
- Mobile app biometric libraries

## Phase 4: Recruiter Profile System (3-4 weeks) ✅ COMPLETED

**Goal:** Complete recruiter onboarding and verification system
**Success Criteria:** Recruiters can create verified profiles and join companies

### Must-Have Features

- [x] **Recruiter Profile CRUD** - Complete recruiter profile management with validation `L`
- [x] **Company Association** - Link recruiters to company profiles via IDs `M`
- [x] **Verification Workflow** - Document-based verification with auto-approval `L`
- [x] **Role-Based Permissions** - Verification status and access control `M`

### Dependencies

- Integration with company-service
- Document verification service setup
