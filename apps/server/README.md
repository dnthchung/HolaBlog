# HolaBlog Server

Backend API server for HolaBlog - a modern blogging platform built with Node.js, Express, Drizzle ORM, and MySQL.

## Features

- ✅ RESTful API for blogs and users
- ✅ MySQL database with Drizzle ORM
- ✅ Docker containerization
- ✅ TypeScript support
- ✅ Input validation with Zod
- ✅ CORS configuration
- ✅ Database seeding with sample data
- ✅ Health check endpoints

## Tech Stack

- **Runtime**: Bun
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Language**: TypeScript
- **Container**: Docker

## Project Structure

```
src/
├── db/
│   ├── index.ts       # Database connection
│   ├── schema.ts      # Database schema definitions
│   ├── seed.ts        # Sample data seeding
│   └── setup.ts       # Initial setup script
├── routers/
│   ├── index.ts       # Main API router
│   ├── users.ts       # User routes
│   └── blogs.ts       # Blog routes
├── middlewares/       # Express middlewares
├── utils/            # Utility functions
└── index.ts          # Main server file
```

## Quick Start

### Option 1: Automatic Setup (Recommended)

1. **Clone and install dependencies**:
   ```bash
   cd apps/server
   bun install
   ```

2. **Setup environment**:
   ```bash
   cp .env.example env
   # Edit env file with your configuration if needed
   ```

3. **Run automatic setup**:
   ```bash
   bun run db:setup
   ```
   This will:
   - Start Docker containers
   - Create database schema
   - Seed with sample data

4. **Start development server**:
   ```bash
   bun run dev
   ```

### Option 2: Manual Setup

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Setup environment**:
   ```bash
   cp .env.example env
   ```

3. **Start database**:
   ```bash
   bun run db:start
   ```

4. **Wait for database to be ready** (about 10-15 seconds)

5. **Push schema**:
   ```bash
   bun run db:push
   ```

6. **Seed database**:
   ```bash
   bun run db:seed
   ```

7. **Start server**:
   ```bash
   bun run dev
   ```

## Environment Variables

Copy `.env.example` to `env` and configure:

```env
# Database Configuration
DATABASE_URL=mysql://user:password@localhost:3307/holablog

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Application Configuration
APP_NAME=HolaBlog
APP_URL=http://localhost:3000
```

## Available Scripts

### Development
- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run build` - Build for production

### Database
- `bun run db:setup` - Complete database setup (containers + schema + seed)
- `bun run db:start` - Start Docker containers
- `bun run db:stop` - Stop Docker containers
- `bun run db:down` - Remove Docker containers
- `bun run db:watch` - Start containers with logs
- `bun run db:push` - Push schema to database
- `bun run db:studio` - Open Drizzle Studio
- `bun run db:seed` - Seed database with sample data
- `bun run db:reset` - Reset database (down + start + push + seed)

### Other
- `bun run check-types` - Type checking
- `bun run compile` - Compile to binary

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Health Check
- `GET /` - Welcome message
- `GET /api` - API information
- `GET /api/health` - Health status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Blogs
- `GET /api/blogs` - Get all blogs (with filters)
- `GET /api/blogs/:slug` - Get blog by slug
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

#### Blog Filters
Query parameters for `GET /api/blogs`:
- `status` - Filter by status (draft, published, archived)
- `search` - Search in titles
- `author` - Filter by author ID
- `limit` - Number of results (max 50, default 10)
- `page` - Page number (default 1)

Example:
```
GET /api/blogs?status=published&search=typescript&limit=20&page=1
```

## Sample Data

The seeding script creates:
- **4 Users**: Admin, John Doe, Jane Smith, Alex Chen
- **5 Blog Posts**: Various tech articles with different statuses

### Sample Users
- **admin** (admin@holablog.com) - Blog Administrator
- **john_doe** (john@example.com) - Frontend Developer
- **jane_smith** (jane@example.com) - Full-stack Developer
- **alex_chen** (alex@example.com) - DevOps Engineer

## Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `fullName` - Full name
- `bio` - User biography
- `avatar` - Avatar URL
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

### Blogs Table
- `id` - Primary key
- `title` - Blog title
- `slug` - URL-friendly slug
- `content` - Blog content (Markdown)
- `excerpt` - Short description
- `featuredImage` - Featured image URL
- `status` - Status (draft, published, archived)
- `viewCount` - View counter
- `authorId` - Foreign key to users
- `publishedAt` - Publication timestamp
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

## Development Tools

### Drizzle Studio
Access the database GUI:
```bash
bun run db:studio
```
Opens at: http://localhost:4983

### Database Management
```bash
# View logs
bun run db:watch

# Reset everything
bun run db:reset

# Manual seed
bun run db:seed
```

## Troubleshooting

### Database Connection Issues
1. Ensure Docker is running
2. Check if containers are up: `docker ps`
3. Wait 10-15 seconds after starting containers
4. Check logs: `bun run db:watch`

### Port Already in Use
```bash
# Kill process on port 3000
sudo lsof -ti:3000 | xargs kill -9

# Or change PORT in env file
PORT=3001
```

### Docker Issues
```bash
# Remove all containers and volumes
bun run db:down
docker system prune -f

# Restart setup
bun run db:setup
```

## Production Deployment

1. **Build the application**:
   ```bash
   bun run build
   ```

2. **Set production environment**:
   ```env
   NODE_ENV=production
   DATABASE_URL=your-production-db-url
   ```

3. **Start production server**:
   ```bash
   bun run start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
