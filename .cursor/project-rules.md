# 🎯 holablog PROJECT RULES - AI ASSISTANT PROMPTING GUIDE

## 📋 PROJECT OVERVIEW
**Project Type**: Blog Personal API-First Architecture  
**Tech Stack**: TypeScript, Bun, Express, Drizzle ORM, MySQL, Cloudinary, Email Services  
**Architecture**: Monorepo with API Server + Web Frontend (Future)  
**Current Focus**: Backend API Development  

---

## 🏗️ FOLDER STRUCTURE RULES

### ✅ CURRENT STRUCTURE (MUST FOLLOW)
```
apps/server/src/
├── api/                    # Replace 'routers' - All API logic by resource
│   ├── auth/              # Authentication module
│   │   ├── auth.controller.ts    # Request/Response handling
│   │   ├── auth.service.ts       # Business logic, DB interactions
│   │   ├── auth.router.ts        # Route definitions for '/auth'
│   │   └── auth.schema.ts        # DTOs and Zod validation
│   ├── users/             # User management module
│   ├── posts/             # Blog posts module
│   ├── comments/          # Comments module
│   └── index.ts           # Aggregate all routers
├── db/
│   ├── index.ts           # Drizzle client initialization
│   └── schema.ts          # ALL Drizzle schemas centralized
├── middlewares/
│   ├── auth.middleware.ts # JWT authentication checks
│   └── error.middleware.ts # Centralized error handling
├── integrations/          # Third-party services (NEW)
│   ├── google.ts          # Google OAuth integration
│   ├── cloudinary.ts      # Media upload signatures
│   └── email.ts           # Email service adapter
├── security/              # Security utilities (NEW)
│   ├── jwt.ts             # JWT token creation/verification
│   ├── password.ts        # bcrypt hash/verify
│   └── rate-limit.ts      # Rate limiting (optional)
├── utils/
│   ├── logger.ts          # Logging configuration
│   └── exceptions.ts      # Custom error classes
└── index.ts               # Entry point, Express app initialization
```

### 🚫 FORBIDDEN PATTERNS
- ❌ Don't use `/routes` or `/controllers` as top-level folders
- ❌ Don't mix business logic in route files
- ❌ Don't put schemas in separate `/schemas` folder
- ❌ Don't create `/helpers` folder (use `/utils`)

---

## 🔐 AUTHENTICATION SYSTEM RULES

### ✅ REQUIRED AUTH METHODS (DUAL LOGIN)
1. **Google OAuth** - Social login (primary)
2. **Email/Password** - Traditional login (secondary)

### ✅ REQUIRED AUTH ENDPOINTS
```typescript
POST /api/auth/register      // Email/password registration
POST /api/auth/login         // Email/password login
POST /api/auth/google        // Google OAuth login/register
POST /api/auth/forgot-password // Send reset email
POST /api/auth/reset-password  // Reset password from email
GET  /api/auth/verify-email    // Email verification
POST /api/auth/refresh         // Refresh JWT tokens
POST /api/auth/logout          // Logout and invalidate tokens
```

### ✅ SECURITY REQUIREMENTS
- **MANDATORY**: bcrypt for password hashing
- **MANDATORY**: JWT access + refresh token pattern
- **MANDATORY**: Email verification for registration
- **MANDATORY**: Rate limiting on auth endpoints
- **RECOMMENDED**: HttpOnly cookies for refresh tokens

---

## 📊 DATABASE RULES

### ✅ REQUIRED PATTERNS
- **ORM**: Drizzle ORM (MUST USE)
- **Database**: MySQL (via Docker)
- **Schema Location**: `src/db/schema.ts` (centralized)
- **Migration**: Use drizzle-kit generate + migrate

### ✅ REQUIRED USER SCHEMA FIELDS
```typescript
users table MUST include:
- id (primary key)
- email (unique, not null)
- password (nullable - for Google users)
- provider (enum: 'email', 'google', 'both')
- emailVerified (boolean, default false)
- role (enum: 'admin', 'user')
- createdAt, updatedAt timestamps
- Google fields: googleId, avatar, name
```

---

## 🎯 API DESIGN RULES

### ✅ CONTROLLER PATTERN (MANDATORY)
```typescript
// controller.ts - Handle HTTP requests/responses only
export const createPost = async (req: Request, res: Response) => {
  const data = await postService.create(req.body)
  res.json({ success: true, data })
}

// service.ts - Business logic and DB operations
export const create = async (postData: CreatePostDTO) => {
  // Business logic here
  return await db.insert(posts).values(postData)
}

// router.ts - Route definitions only
router.post('/posts', validateSchema(createPostSchema), createPost)

// schema.ts - Zod validation schemas
export const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1)
})
```

### ✅ RESPONSE FORMAT (STANDARDIZED)
```typescript
// Success Response
{
  "success": true,
  "data": any,
  "message"?: string
}

// Error Response
{
  "success": false,
  "error": {
    "code": string,
    "message": string,
    "details"?: any
  }
}
```

---

## 🔧 DEVELOPMENT RULES

### ✅ REQUIRED COMMANDS
```bash
bun run dev          # Development with hot reload
bun run build        # Production build
bun run start        # Production start
bun run db:start     # Start MySQL container
bun run db:studio    # Drizzle Studio
bun run db:migrate   # Apply migrations
bun run db:generate  # Generate migrations
```

### ✅ ENVIRONMENT VARIABLES (REQUIRED)
```env
# Database
DATABASE_URL=mysql://root:password@localhost:3306/holablog

# JWT
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Service (choose one)
SENDGRID_API_KEY=your-sendgrid-key
# OR
MAILGUN_API_KEY=your-mailgun-key
MAILGUN_DOMAIN=your-domain

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# App Config
APP_PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
```

---

## 🎨 CODING STYLE RULES

### ✅ NAMING CONVENTIONS
- **Files**: kebab-case (`auth.service.ts`)
- **Variables/Functions**: camelCase (`createUser`)
- **Classes**: PascalCase (`UserService`)
- **Constants**: SCREAMING_SNAKE_CASE (`JWT_SECRET`)
- **Database Tables**: snake_case (`user_sessions`)

### ✅ IMPORT/EXPORT PATTERNS
```typescript
// Use named exports (preferred)
export const authService = {
  login,
  register,
  verifyToken
}

// Default exports only for main objects
export default router
```

### ✅ ERROR HANDLING PATTERN
```typescript
// Custom error classes (required)
export class ValidationError extends Error {
  statusCode = 400
}

export class UnauthorizedError extends Error {
  statusCode = 401
}

// Error middleware (centralized)
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.constructor.name,
      message: err.message
    }
  })
}
```

---

## 🚀 INTEGRATION RULES

### ✅ THIRD-PARTY SERVICES
- **Google Auth**: Use `google-auth-library` for ID token verification
- **Email**: Abstract email service to support multiple providers
- **Cloudinary**: Admin-only signed upload URLs
- **Rate Limiting**: Use `express-rate-limit` or similar

### ✅ MIDDLEWARE ORDER (CRITICAL)
```typescript
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
app.use(rateLimit())          // Rate limiting first
app.use('/api', apiRoutes)    // All API routes
app.use(errorHandler)         // Error handler last
```

---

## 📝 WHEN PROMPTING AI ASSISTANTS

### ✅ ALWAYS INCLUDE:
1. "Follow the holablog project rules"
2. Current working directory context
3. Specific module you're working on (auth, users, posts, etc.)
4. Whether it's a new feature or bug fix

### ✅ EXAMPLE GOOD PROMPTS:
```
"Following holablog project rules, create a complete posts module with CRUD operations. 
Include controller, service, router, and schema files following the established patterns."

"Fix the authentication middleware in holablog project. The JWT verification is failing. 
Follow the existing error handling patterns and security rules."
```

### 🚫 AVOID VAGUE PROMPTS:
```
❌ "Create an API"
❌ "Fix the auth"
❌ "Add database stuff"
```

---

## 🔍 VALIDATION CHECKLIST

Before considering any task complete, verify:

- [ ] Follows folder structure rules
- [ ] Uses proper controller/service/router pattern
- [ ] Includes Zod validation schemas
- [ ] Has proper error handling
- [ ] Follows naming conventions
- [ ] Includes TypeScript types
- [ ] Has appropriate middleware
- [ ] Follows security best practices
- [ ] Uses standardized response format
- [ ] Includes proper logging

---

**Last Updated**: August 12, 2025  
**Version**: 1.0.0  
**Maintainer**: dnthchung
