# UnixDox - Project Documentation

## 1. Context and "The Why"

### Problem: What specific problem does your app solve for the user?

**UnixDox** solves the problem of **managing French administrative documents and procedures** by providing a centralized, AI-powered platform that:

1. **Organizes Documents** - Users can upload, classify, and tag administrative documents (invoices, contracts, IDs, passports, insurance papers) in one place
2. **Automates Classification** - AI automatically extracts data, classifies document types, and identifies expiration dates
3. **Tracks Deadlines** - Automatic alerts for expiring documents (IDs, insurance, contracts)
4. **Simplifies Procedures** - Wizards to guide users through administrative procedures ("démarches administratives") with auto-generated draft letters

### Objectives: What are the 3 main goals of the application?

| Goal | Description |
|------|-------------|
| **1. Automation** | Use AI (Google Gemini Flash 1.5) to automatically classify documents, extract key data, and match documents to procedure requirements |
| **2. Centralization** | Provide a single workspace for all administrative documents with unified search and folder organization |
| **3. Compliance** | Help users track deadlines and renewals to avoid expired documents and missed procedures |

### Target Audience: Who are the primary users?

| Persona | Description | Key Expectations |
|---------|-------------|------------------|
| **French Citizens** | Individuals managing personal administrative documents | Easy upload, automatic French document recognition, expiration reminders |
| **Small Business Owners** | Managing business documents and invoices | Organization by folder/dossier, invoice tracking |
| **Expats** | Managing documents from multiple countries | Multi-type document support, clear categorization |

### Key Features: Must-have vs Should-have

| Priority | Features |
|----------|----------|
| **Must-Have** | User authentication (Google OAuth), Document upload & storage, AI document classification, Administrative procedures (démarches), Dashboard with stats |
| **Should-Have** | Folder organization (Dossiers), Deadline tracking (Échéances), Notifications for expiring documents, Unified search, User profile & settings |
| **Nice-to-Have** | Admin panel, Help documentation, Premium subscription tiers |

---

## 2. The Technical Stack (Architecture)

### Front-end: Framework and rationale

| Technology | Choice |
|------------|--------|
| **Framework** | **Next.js 16** with App Router |
| **UI Library** | **Chakra UI v3** + **React 19** |
| **Styling** | Tailwind CSS 4 + CSS Modules |
| **Animation** | Framer Motion |
| **Forms** | Zod for validation |

**Why Next.js?**
- Server Actions provide seamless backend functionality without separate API servers
- App Router enables better server/client component separation
- Built-in optimization for images and fonts
- Excellent TypeScript support

**Why Chakra UI?**
- Accessible component library with modern design
- Easy theming support
- Works well with Next.js and React 19

### Back-end: Architecture

| Aspect | Choice |
|--------|--------|
| **Architecture** | **Monolithic** - Next.js API Routes + Server Actions |
| **Runtime** | Node.js (Next.js) |
| **API** | REST via Next.js Route Handlers |

The backend uses **Next.js Server Actions** for mutations and **API Routes** for external integrations. This keeps the application as a single deployable unit rather than splitting frontend and backend.

### Database: Storage choice

| Aspect | Choice |
|--------|--------|
| **Database** | **MongoDB 7.0** |
| **ORM** | Prisma 5.19 |
| **Provider** | MongoDB (NoSQL) |

**Why MongoDB?**
- **Flexible Schema** - Administrative documents have varying structures; NoSQL accommodates this
- **Document-centric** - Maps well to JSON-like document storage
- **Geo-distribution** - Good for applications serving French users primarily
- **Prisma Support** - Good TypeScript integration with Prisma

### External Services

| Service | Purpose |
|---------|---------|
| **Google OAuth** | User authentication |
| **Google Drive API** | Document storage |
| **Google Gemini Flash 1.5** | AI document classification and data extraction |

---

## 3. Data and Security

### Data Model: Main entities and relationships

```
┌─────────────┐       ┌─────────────┐
│    User     │       │   Account   │
│  (owner)    │       │ (OAuth)     │
└──────┬──────┘       └──────┬──────┘
       │                     │
       │ 1:N                 │ 1:1
       ▼                     │
┌─────────────┐              │
│  Document   │<─────────────┘
│             │
└──────┬──────┘
       │
       │ N:N (via dossierIds)
       ▼
┌─────────────┐       ┌─────────────┐
│   Dossier   │       │   Demarche  │
│  (Folder)   │       │  Utilisateur│
└─────────────┘       └──────┬──────┘
                              │
                              │ N:1
                              ▼
                      ┌─────────────┐
                      │ Modele     │
                      │ Demarche   │
                      └─────────────┘
```

**Main Entities:**

| Entity | Description |
|--------|-------------|
| **User** | User account with plan (FREE/BASIC/PREMIUM/ENTERPRISE), role (USER/MANAGER/ADMIN) |
| **Document** | Uploaded files with type, status, tags, expiration date |
| **Dossier** | Folders for organizing documents |
| **ModeleDemarche** | Procedure templates (created by admins) |
| **DemarcheUtilisateur** | User's procedure instances |
| **Notification** | User notifications (expiration, reminders) |
| **Account** | OAuth account linking (Google) |

### Authentication: How users log in

| Aspect | Implementation |
|--------|----------------|
| **Provider** | Google OAuth 2.0 |
| **Library** | NextAuth.js v5 (`next-auth@5.0.0-beta.30`) |
| **Session** | JWT tokens |
| **Role-based access** | USER, MANAGER, ADMIN roles embedded in JWT |

### Protection: Security measures

| Measure | Implementation |
|---------|----------------|
| **Route Protection** | Next.js Middleware (`middleware.ts`) |
| **Input Validation** | Zod schemas throughout |
| **Rate Limiting** | AI service has exponential backoff retry logic |
| **File Upload Limit** | 5MB body size limit in `next.config.ts` |
| **Session Security** | Picture cleared from token to prevent large base64 |
| **Error Handling** | Custom error utilities with proper error messages |

### Compliance: GDPR handling

| Aspect | Implementation |
|--------|----------------|
| **Data Minimization** | Only essential user data collected (name, email, plan) |
| **User Preferences** | Notification preferences stored per user |
| **Account Deletion** | Possible via User model (no automated deletion implemented yet) |

---

## 4. Infrastructure and Quality

### Hosting: Where is the app deployed?

| Component | Current State |
|-----------|---------------|
| **Application** | Not deployed (local development) |
| **Database** | MongoDB 7.0 via Docker Compose |
| **Configuration** | `docker-compose.yml` with MongoDB replica set |

**Environment Variables Required:**
- `MONGODB_URI` - Database connection
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - OAuth
- `AUTH_SECRET` / `NEXTAUTH_SECRET` - Auth secrets
- `GENERATIVE_AI_API_KEY` - Google AI

### CI/CD: How updates are pushed

| Aspect | Current State |
|--------|---------------|
| **Pipeline** | **None configured** |
| **Workflows** | No `.github/workflows/` folder |
| **Deployment** | Manual |

**Recommendation:** Add GitHub Actions for automated testing and deployment.

### Tests: Testing strategy

| Type | Tool | Status |
|------|------|--------|
| **E2E Tests** | Playwright | Configured (`playwright.config.ts`) |
| **Test Files** | `e2e/` folder | Includes `demarche.spec.ts`, `register.spec.ts` |
| **Unit Tests** | None | Not implemented |
| **Integration Tests** | None | Not implemented |

### Monitoring: How to detect crashes

| Aspect | Current State |
|--------|---------------|
| **Logging** | Console logging + NextAuth built-in logger |
| **Monitoring** | **None** (no Sentry, DataDog, etc.) |
| **Error Tracking** | Custom error utilities in `shared/utils/errors.ts` |

---

## 5. Retrospective and Evolution

### Difficulties: Hardest technical challenges

| Challenge | Solution |
|-----------|----------|
| **MongoDB + Prisma** | Prisma's MongoDB support required specific configuration for replica sets |
| **AI Rate Limiting** | Implemented exponential backoff retry logic in AI service |
| **Google Drive Integration** | Used `googleapis` library for OAuth and file storage |
| **NextAuth v5 Beta** | Adapted to new beta API with JWT callbacks for role propagation |

### Scalability: What would break with 100,000 users?

| Component | Risk | Fix |
|-----------|------|-----|
| **MongoDB** | Connection limits | Add connection pooling, consider sharding |
| **AI API** | Rate limits & costs | Implement caching, queue system, or self-hosted model |
| **Google Drive** | API quotas | Add file storage abstraction (S3, Cloudflare R2) |
| **No CI/CD** | Manual deployments | Implement GitHub Actions pipeline |
| **No Monitoring** | No visibility | Add Sentry for error tracking |

### V2 Perspectives: Next 3 technical improvements

| Priority | Improvement | Description |
|----------|-------------|-------------|
| **1** | **CI/CD Pipeline** | GitHub Actions for automated testing and deployment |
| **2** | **Monitoring** | Integrate Sentry for error tracking and performance monitoring |
| **3** | **Global Rate Limiting** | Add upstash/ratelimit for API protection |
| **Bonus** | **Self-hosted AI** | Consider local AI model to reduce API costs and improve privacy |
| **Bonus** | **Object Storage** | Abstract file storage (S3/R2) instead of Google Drive |

---

## Summary

| Category | Key Details |
|----------|-------------|
| **App Type** | French administrative document management |
| **Tech Stack** | Next.js 16, React 19, Chakra UI, MongoDB, Prisma |
| **Auth** | Google OAuth via NextAuth.js |
| **AI** | Google Gemini Flash 1.5 |
| **Storage** | Google Drive API |
| **Testing** | Playwright (E2E) |
| **Deployment** | Docker Compose (local), not yet deployed |
| **Main Features** | Document upload/AI classification, Administrative procedures, Deadline tracking |
