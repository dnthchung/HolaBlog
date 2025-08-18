# � holablog PROJECT - QUICK START GUIDE

**Project**: Personal Blog API-First Architecture  
**Tech Stack**: TypeScript + Bun + Express + Drizzle + MySQL  
**Status**: Development Phase  

---

## ⚡ QUICK COMMANDS REFERENCE

### 🔥 Development (Most Used)
```bash
bun run dev          # 🚀 Start development server (hot reload)
bun run db:start     # 🗄️ Start MySQL container  
bun run db:studio    # 👀 Open Drizzle Studio (DB browser)
```

### 🗄️ Database Management
```bash
bun run db:start     # Start MySQL container (port 3306)
bun run db:stop      # Stop MySQL container
bun run db:down      # Remove MySQL container completely
bun run db:migrate   # Apply pending migrations to DB
bun run db:generate  # Generate new migration files
bun run db:push      # Push schema directly (dev only)
bun run db:studio    # Launch Drizzle Studio at http://localhost:4983
```

### 🏗️ Build & Production
```bash
bun run build       # Build TypeScript → JavaScript (dist/)
bun run compile     # Compile to binary (minified + bytecode)
bun run start       # Run production build (from dist/)
```

---

## 🎯 TYPICAL WORKFLOWS

### 🆕 First Time Setup
```bash
# 1. Start database
bun run db:start

# 2. Setup schema (first time only)
bun run db:push     # Creates tables in DB

# 3. Start development  
bun run dev

# 4. Check everything works
# ✅ API: http://localhost:3000
# ✅ Health: http://localhost:3000/health
# ✅ DB Studio: bun run db:studio
```

### 📅 Daily Development
```bash
# Quick start (database auto-starts if container exists)
bun run dev

# If you need fresh database
bun run db:down && bun run db:start && bun run db:push
```

### 🔄 Database Schema Changes
```bash
# 1. Edit src/db/schema.ts
# 2. Generate migration
bun run db:generate

# 3. Apply migration  
bun run db:migrate

# OR for quick dev (skips migration files)
bun run db:push
```

---

## 🌐 DEVELOPMENT URLS

| Service | URL | Purpose |
|---------|-----|---------|
| **API Server** | http://localhost:3000 | Main backend API |
| **Health Check** | http://localhost:3000/health | Database connection status |
| **Drizzle Studio** | http://localhost:4983 | Visual database browser |
| **MySQL DB** | localhost:3306 | Direct database connection |

---

## 🚨 TROUBLESHOOTING

### ❌ Common Issues & Solutions

**1. Port 3306 Already in Use**
```bash
# Check what's using port 3306
netstat -tulpn | grep 3306

# Option A: Stop other MySQL service
sudo service mysql stop

# Option B: Change port in docker-compose.yml
# "3307:3306" instead of "3306:3306"
```

**2. Database Connection Failed**
```bash
# Check if container is running
docker ps

# Restart database
bun run db:stop
bun run db:start

# Check logs
docker logs holablog-mysql
```

**3. Migration Issues**
```bash
# Reset migrations (DANGER: loses data)
bun run db:down
bun run db:start  
bun run db:push

# Or manually fix migration files in src/db/migrations/
```

**4. Hot Reload Not Working**
```bash
# Restart dev server
# Ctrl+C to stop, then:
bun run dev
```

---

## 📁 PROJECT STRUCTURE QUICK REF

```
apps/server/src/
├── api/              # API modules (auth, users, posts, etc.)
├── db/               # Database (schema.ts, migrations/)
├── middlewares/      # Express middlewares  
├── integrations/     # Third-party services (Google, email, etc.)
├── security/         # JWT, password hashing, etc.
├── utils/            # Helpers (logger, exceptions)
└── index.ts          # App entry point
```

---

## 🔧 ENVIRONMENT SETUP

**Required .env variables:**
```env
# Database
DATABASE_URL=mysql://root:password@localhost:3306/holablog

# JWT Security  
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key

# External Services (setup later)
GOOGLE_CLIENT_ID=your-google-client-id
SENDGRID_API_KEY=your-sendgrid-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
```

---

## 🎓 LEARNING RESOURCES

- **Drizzle ORM**: https://orm.drizzle.team/
- **Bun Runtime**: https://bun.sh/docs
- **Express.js**: https://expressjs.com/
- **JWT Best Practices**: https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/

---

## 📝 DEVELOPMENT NOTES

### ✅ What's Working
- ✅ Basic Express server setup
- ✅ Database connection with Drizzle
- ✅ Hot reload with Bun
- ✅ Docker MySQL container
- ✅ Health check endpoint

### 🚧 Next Steps (In Progress)
- 🚧 Authentication system (Google + Email/Password)
- 🚧 User management APIs
- 🚧 Blog posts CRUD
- 🚧 Comment system
- 🚧 File upload integration

### 📋 TODO
- [ ] Email service integration
- [ ] JWT token management
- [ ] Admin dashboard
- [ ] Frontend app
- [ ] Deployment setup

---

**💡 Pro Tips:**
- Always run `bun run db:start` before `bun run dev`
- Use `bun run db:studio` to visually inspect database
- Check `http://localhost:3000/health` to verify DB connection
- Hot reload automatically restarts on file changes
- Use `bun run db:push` for quick schema changes in development

**Last Updated**: August 12, 2025  
**Version**: 1.1.0

