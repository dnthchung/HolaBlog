# 🏗️ holablog PROJECT - RECOMMENDED ARCHITECTURE

**Updated**: August 12, 2025  
**Architecture**: API-First Blog System  
**Scope**: Monorepo with Backend Focus (Frontend Future)  

---

## 🎯 CURRENT IMPLEMENTATION (Phase 1)

**Focus**: Backend API Development Only  
**Timeline**: Current development phase  

```
holablog/
├── turbo.json                    # Monorepo task runner
├── package.json                  # Root dependencies
├── bunfig.toml                   # Bun configuration
├── .env.example                  # Environment template
├── docker-compose.yml            # MySQL database
├── .cursor/                      # AI assistant rules & docs
│   ├── project-rules.md         # 🎯 Main rules for AI prompting
│   ├── logic.md                 # Business logic & requirements
│   └── note.md                  # Quick start guide
├── rules/
│   └── folder structure.md      # Legacy structure reference
└── apps/
    └── server/                  # 🚀 MAIN BACKEND API
        ├── drizzle.config.ts
        ├── package.json
        ├── docker-compose.yml
        └── src/
            ├── index.ts         # Express app entry point
            ├── api/             # 🔥 API modules by resource
            │   ├── auth/        # Authentication (Google + Email/Password)
            │   │   ├── auth.controller.ts
            │   │   ├── auth.service.ts
            │   │   ├── auth.router.ts
            │   │   └── auth.schema.ts    # Zod validation
            │   ├── users/       # User management
            │   ├── posts/       # Blog posts CRUD
            │   ├── comments/    # Comment system
            │   └── index.ts     # Route aggregation
            ├── db/
            │   ├── index.ts     # Drizzle client
            │   ├── schema.ts    # All database schemas
            │   └── migrations/  # Auto-generated migrations
            ├── middlewares/
            │   ├── auth.middleware.ts    # JWT verification
            │   └── error.middleware.ts   # Global error handler
            ├── integrations/    # 🔌 Third-party services
            │   ├── google.ts    # Google OAuth
            │   ├── cloudinary.ts # Media upload
            │   └── email.ts     # Email service (SendGrid/Mailgun)
            ├── security/        # 🔒 Security utilities
            │   ├── jwt.ts       # Token management
            │   ├── password.ts  # bcrypt hashing
            │   └── rate-limit.ts
            └── utils/
                ├── logger.ts    # Logging (pino)
                └── exceptions.ts # Custom errors
```

---

## 🚀 FUTURE EXPANSION (Phase 2)

**When Backend Stable**: Add Frontend & Shared Packages

```
holablog/
├── apps/
│   ├── server/                  # ✅ Backend API (Phase 1)
│   └── web/                     # 🔮 Frontend App (Phase 2)
│       ├── next.config.mjs
│       └── src/
│           ├── app/             # Next.js App Router
│           │   ├── (site)/     # Public pages
│           │   │   ├── page.tsx          # Homepage
│           │   │   ├── posts/            # Blog listing
│           │   │   └── posts/[slug]/     # Single post
│           │   ├── (auth)/     # Auth pages
│           │   │   ├── login/page.tsx
│           │   │   ├── register/page.tsx
│           │   │   └── forgot-password/
│           │   └── admin/      # Admin dashboard
│           │       ├── layout.tsx
│           │       ├── posts/
│           │       └── users/
│           ├── components/     # Reusable UI components
│           └── lib/
│               ├── api-client.ts    # Backend API SDK
│               └── auth.ts          # Auth context
├── packages/                    # 📦 Shared code (Phase 2)
│   ├── types/                   # TypeScript types
│   ├── validators/              # Zod schemas
│   ├── sdk/                     # API client
│   └── config/                  # Shared configs
└── infra/                       # 🚢 Deployment (Phase 3)
    ├── Dockerfile.api
    ├── nginx/
    └── scripts/
```

---

## 🎯 ARCHITECTURE DECISIONS

### ✅ CURRENT CHOICES (Backend)

| Aspect | Choice | Reasoning |
|--------|--------|-----------|
| **Runtime** | Bun | Fast TypeScript execution, built-in bundler |
| **Framework** | Express.js | Mature, flexible, extensive ecosystem |
| **Database** | MySQL + Drizzle | Relational data, type-safe ORM |
| **Auth** | JWT + Google OAuth | Stateless tokens, social login UX |
| **File Upload** | Cloudinary | Managed CDN, image optimization |
| **Email** | SendGrid/Mailgun | Reliable delivery, templates |
| **Deployment** | Docker + VPS | Cost-effective, full control |

### 🔮 FUTURE CHOICES (Frontend)

| Aspect | Future Choice | Reasoning |
|--------|---------------|-----------|
| **Frontend** | Next.js 14 App Router | SSR for SEO, React ecosystem |
| **Styling** | Tailwind CSS | Utility-first, design system |
| **UI Components** | shadcn/ui | Accessible, customizable |
| **State Management** | Zustand | Simple, TypeScript-friendly |

---

## 🔗 API DESIGN PRINCIPLES

### 📡 RESTful API Structure
```
/api/auth/*          # Authentication endpoints
/api/users/*         # User management  
/api/posts/*         # Blog posts CRUD
/api/posts/:id/comments/*  # Nested comments
/api/categories/*    # Post categories
/api/tags/*          # Post tags
/api/media/*         # File upload utilities
```

### 🏗️ Module Pattern (MANDATORY)
Each API module MUST have:
- `*.controller.ts` - HTTP request/response handling
- `*.service.ts` - Business logic, database operations  
- `*.router.ts` - Route definitions and middleware
- `*.schema.ts` - Zod validation schemas

### 🔒 Security Layers
1. **Rate Limiting** - Prevent abuse
2. **JWT Authentication** - Stateless auth
3. **Role-Based Access** - Admin vs User permissions
4. **Input Validation** - Zod schema validation
5. **Error Handling** - Structured error responses

---

## 📊 DATABASE DESIGN

### 🗄️ Core Entities
- **users** - Authentication & profiles
- **posts** - Blog content (Admin only creates)
- **comments** - User interactions (nested replies)
- **categories** - Post organization
- **tags** - Post labeling

### 🔗 Relationships
- `users (1) → (∞) posts` - Admin creates posts
- `users (1) → (∞) comments` - Users comment  
- `posts (1) → (∞) comments` - Posts have comments
- `posts (∞) ↔ (∞) categories` - Many-to-many
- `posts (∞) ↔ (∞) tags` - Many-to-many

---

## 🚀 DEPLOYMENT STRATEGY

### 📦 Phase 1: Backend Only
- **Backend**: Docker container on VPS
- **Database**: MySQL container  
- **CDN**: Cloudinary for media
- **Domain**: API subdomain (api.yourdomain.com)

### 🌐 Phase 2: Full Stack
- **Frontend**: Vercel/Netlify (Next.js)
- **Backend**: Same VPS or upgrade to managed service
- **Database**: Consider managed MySQL (PlanetScale/Railway)

### 📈 Phase 3: Scale
- **Load Balancer**: nginx reverse proxy
- **Caching**: Redis for sessions/cache
- **Monitoring**: Uptime monitoring, error tracking
- **Analytics**: Google Analytics, performance monitoring

---

## 💡 WHY THIS ARCHITECTURE?

### ✅ BENEFITS

1. **🔧 Flexibility**: API-first cho future mobile app
2. **⚡ Performance**: Bun runtime, optimized queries
3. **🛡️ Security**: JWT tokens, input validation, rate limiting
4. **📈 Scalable**: Microservice-ready, horizontal scaling
5. **🎯 Focused**: Start small, expand gradually
6. **💰 Cost-Effective**: Use managed services for complex parts

### 🎯 PERFECT FOR

- Solo developer projects
- Personal/professional blogs
- Portfolio websites  
- Content-focused applications
- Learning modern web development

---

**📝 Note**: This structure balances **simplicity** (current needs) with **scalability** (future growth). Focus on Phase 1 backend API first, then expand to frontend when ready.

**Last Updated**: August 12, 2025  
**Version**: 2.0.0
```
│        │  └─ validators.ts
│        ├─ styles/
│        └─ public/
├─ packages/                    # chia sẻ giữa apps
│  ├─ db/                       # (tùy chọn nâng cao) tách schema dùng chung
│  │  ├─ package.json
│  │  ├─ src/
│  │  │  ├─ schema.ts
│  │  │  └─ drizzle.ts         # factory tạo client (node/edge)
│  │  └─ README.md
│  ├─ sdk/                      # REST client typed (dùng Zod inference)
│  │  ├─ package.json
│  │  └─ src/index.ts
│  ├─ email-templates/          # template email (MJML/React Email)
│  │  ├─ package.json
│  │  └─ src/
│  │     ├─ verify-email.mjml
│  │     └─ reset-password.mjml
│  ├─ config/
│  │  ├─ tsconfig/base.json
│  │  ├─ eslint/index.cjs
│  │  └─ prettier/index.cjs
│  ├─ types/
│  │  └─ src/index.ts           # DTO/type chia sẻ FE/BE
│  └─ validators/
│     └─ src/index.ts           # gói Zod schemas chia sẻ
└─ tests/                       # (tùy chọn) test liên ứng dụng

```

## Giải thích nhanh (và map với yêu cầu)

* **Phân lớp rõ ràng API-first**: `apps/server` là API thuần; `apps/web` chỉ gọi REST qua `packages/sdk` hoặc `src/lib/api-client.ts`.
* **Auth mở rộng**:

  * `POST /api/auth/register | login | google | forgot-password | reset-password | verify-email` nằm trong `apps/server/src/api/auth/*`.
  * `security/jwt.ts` quản lý **access token ngắn hạn** + **refresh token** (nên đặt refresh token trong cookie `HttpOnly`, `Secure`, `SameSite=Strict`).
  * `security/password.ts`: **bcrypt** bắt buộc.
  * `integrations/email.ts`: trừu tượng hoá **SendGrid/Mailgun/SES** (chọn 1 nhà cung cấp qua ENV).
  * `integrations/google.ts`: xác minh Google ID token hoặc thực hiện OAuth code flow.
* **Email verify & reset**: template tách ở `packages/email-templates`, gửi qua `integrations/email.ts`.
* **Cloudinary**: route ký upload (Admin only) nằm ở `integrations/cloudinary.ts` + router nhỏ `/api/media/signature` trong module `posts` hoặc `media`.
* **Drizzle**: schema tập trung `db/schema.ts` (hoặc chia sẻ qua `packages/db` nếu muốn dùng chung trên FE để sinh type).
* **Validation**: mọi DTO có **Zod** (`*.schema.ts`), dùng lại được ở FE qua `packages/validators` (giảm drift).
* **Quản trị**: `/admin` trong app web, được bảo vệ bằng middleware + kiểm tra `role=Admin` từ session/tokens.
* **Middleware lỗi/tách biệt**: `error.middleware.ts` gom lỗi, trả JSON chuẩn (code, message, details).

## Biến môi trường (gợi ý chia file)

* Root: `.env.example` tổng hợp key cần:
  `DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, EMAIL_PROVIDER, SENDGRID_API_KEY | MAILGUN_*, AWS_SES_*, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, APP_ORIGIN, API_ORIGIN`
* Triển khai: mỗi app (`apps/server`, `apps/web`) có `.env.local` riêng, nhưng CI/CD inject từ secret manager.

## Mapping endpoint → file (để bạn nhìn nhanh)

* `POST /api/auth/register` → `api/auth/auth.router.ts` → `auth.controller.register` → `auth.service.createUser`
* `POST /api/auth/login` → `controller.login` → `service.verifyPassword` → `security/jwt.sign`
* `POST /api/auth/google` → `integrations/google.verify` → `service.upsertSocialUser`
* `POST /api/auth/forgot-password` → `service.createResetToken` → `integrations/email.sendReset`
* `POST /api/auth/reset-password` → `service.resetPassword` → `security/password.hash`
* `GET /api/auth/verify-email` → `service.verifyEmailToken`

## Lưu ý “Account Linking”

* Thực hiện ở `auth.service.ts`: khi login Google, nếu email đã tồn tại với `provider='credentials'`, yêu cầu người dùng xác minh bằng mật khẩu một lần (route riêng `/api/auth/link-google`), sau đó cập nhật `users.providers=['credentials','google']`. Lưu **audit log** (bảng `auth_events`) để truy vết.

## Nếu KHÔNG muốn monorepo

Bạn có thể gói gọn **single repo** backend như bản bạn phác thảo, chỉ cần bổ sung vài thư mục:

```txt
server/
└─ src/
   ├─ app.ts
   ├─ index.ts
   ├─ env.ts
   ├─ api/
   │  ├─ auth/ (controller|service|router|schema)
   │  ├─ users/
   │  ├─ posts/
   │  └─ comments/
   ├─ integrations/ (google|email|cloudinary)
   ├─ security/ (jwt|password|rate-limit)
   ├─ db/ (schema|index|migrations)
   ├─ middlewares/ (auth|error|cors)
   ├─ utils/ (logger|exceptions)
   └─ tests/
```

---