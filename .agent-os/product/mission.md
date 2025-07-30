# Product Mission

> Last Updated: 2025-07-30
> Version: 1.0.0

## Pitch

Hirik is a comprehensive HR/recruitment platform that helps job seekers find opportunities and recruiters manage hiring processes by providing a modern serverless edge-first architecture built on Cloudflare Workers for fast global performance.

## Users

### Primary Customers

- **Job Seekers**: Individuals actively looking for new career opportunities
- **Recruiters**: HR professionals managing hiring pipelines and candidate relationships
- **Companies**: Organizations building their teams and managing talent acquisition

### User Personas

**Job Seeker** (22-45 years old)
- **Role:** Software Engineer, Product Manager, Designer, Data Scientist
- **Context:** Seeking better opportunities, career advancement, or job transitions
- **Pain Points:** Limited job discovery, poor application tracking, lack of direct recruiter communication
- **Goals:** Find relevant job matches, streamline application process, get direct feedback from recruiters

**Recruiter** (25-50 years old)
- **Role:** Technical Recruiter, HR Manager, Talent Acquisition Specialist
- **Context:** Managing multiple open positions and candidate pipelines
- **Pain Points:** Inefficient candidate screening, poor communication tools, scattered hiring workflow
- **Goals:** Find qualified candidates quickly, streamline communication, improve hiring efficiency

## The Problem

### Fragmented Hiring Experience

Current recruitment platforms suffer from poor performance, limited real-time communication, and fragmented user experiences. This results in longer time-to-hire and reduced candidate satisfaction.

**Our Solution:** A unified serverless platform with edge computing for global performance and real-time features.

### Limited Search and Discovery

Traditional job boards provide basic keyword search with poor relevance and no intelligent matching. Candidates struggle to find relevant opportunities while recruiters can't efficiently discover qualified talent.

**Our Solution:** Advanced search powered by Meilisearch with intelligent matching and typo-tolerant discovery.

### Poor Communication Infrastructure

Most platforms lack real-time communication between candidates and recruiters, leading to delayed responses and lost opportunities.

**Our Solution:** Real-time chat powered by Cloudflare Durable Objects with persistent WebSocket connections.

## Differentiators

### Edge-First Architecture

Unlike traditional platforms built on centralized servers, we provide global edge computing with Cloudflare Workers. This results in sub-100ms response times worldwide and improved user experience.

### Dual Database Strategy

Unlike competitors using single database approaches, we combine Cloudflare D1 for edge user data with PostgreSQL for core business logic. This provides both edge performance and data consistency.

### Real-Time Communication

Unlike static messaging systems, we provide instant communication through Durable Objects with persistent WebSocket connections. This enables immediate candidate-recruiter interaction.

## Key Features

### Core Features

- **Phone-Based Authentication:** Secure OTP verification system for global user onboarding
- **Profile Management:** Comprehensive user profiles with education, experience, and skill tracking
- **Advanced Search:** Intelligent job and candidate discovery powered by Meilisearch
- **Real-Time Chat:** Instant messaging between candidates and recruiters via Durable Objects

### Collaboration Features

- **Company Team Management:** Role-based access control for recruiting teams
- **Application Tracking:** End-to-end application lifecycle management
- **File Storage:** Secure document handling with Cloudflare R2 integration
- **Mobile Applications:** Native React Native apps for candidates and recruiters

### Technical Features

- **Edge Computing:** Global performance via Cloudflare Workers serverless architecture
- **Multi-Service Architecture:** Microservices for user, job, company, and chat functionality
- **Asynchronous Processing:** Queue-based indexing for search consistency
- **Cross-Platform:** Web and mobile support with unified API architecture