import "dotenv/config";
import { db } from "./index.js";
import { users, blogs } from "./tables.js";

async function seed() {
  console.log("🌱 Starting database seeding...");

  try {
    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await db.delete(blogs);
    await db.delete(users);

    // Insert sample users
    console.log("👥 Creating sample users...");
    const sampleUsers = await db.insert(users).values([
      {
        username: "admin",
        email: "admin@holablog.com",
        fullName: "Blog Administrator",
        bio: "Main administrator of HolaBlog. Passionate about technology and sharing knowledge.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      },
      {
        username: "john_doe",
        email: "john@example.com",
        fullName: "John Doe",
        bio: "Frontend developer who loves React and TypeScript. Always exploring new web technologies.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        fullName: "Jane Smith",
        bio: "Full-stack developer and tech blogger. Enjoys writing about JavaScript, Node.js, and databases.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      },
      {
        username: "alex_chen",
        email: "alex@example.com",
        fullName: "Alex Chen",
        bio: "DevOps engineer with a passion for automation and cloud technologies. Docker and Kubernetes enthusiast.",
        avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
      },
    ]);

    console.log(`✅ Created ${sampleUsers.length} users`);

    // Insert sample blogs
    console.log("📝 Creating sample blog posts...");
    const sampleBlogs = await db.insert(blogs).values([
      {
        title: "Getting Started with Modern Web Development",
        slug: "getting-started-modern-web-development",
        content: `# Getting Started with Modern Web Development

Modern web development has evolved significantly over the past few years. In this comprehensive guide, we'll explore the current landscape and help you understand the essential tools and technologies you need to know.

## The Current State of Web Development

The web development ecosystem is more vibrant than ever, with new frameworks, tools, and best practices emerging regularly. Here are the key areas you should focus on:

### Frontend Technologies
- **React/Vue.js/Svelte**: Component-based frameworks that make building interactive UIs easier
- **TypeScript**: Adds type safety to JavaScript, making your code more reliable
- **CSS Frameworks**: Tailwind CSS, CSS-in-JS solutions for styling
- **Build Tools**: Vite, Webpack, and esbuild for optimizing your code

### Backend Technologies
- **Node.js**: JavaScript runtime for server-side development
- **Express.js/Fastify**: Lightweight web frameworks
- **Databases**: PostgreSQL, MongoDB, Redis for data storage
- **APIs**: REST and GraphQL for data communication

## Getting Started

1. **Learn the Fundamentals**: Start with HTML, CSS, and JavaScript
2. **Choose a Framework**: Pick React, Vue, or Svelte based on your preferences
3. **Understand Backend Concepts**: Learn about servers, databases, and APIs
4. **Practice with Projects**: Build real applications to apply your knowledge

## Conclusion

Web development is an exciting field with endless opportunities to learn and grow. Start with the basics, be patient with yourself, and keep building!`,
        excerpt: "A comprehensive guide to modern web development, covering essential frontend and backend technologies, tools, and best practices for beginners.",
        featuredImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
        status: "published",
        authorId: 1,
        viewCount: 150,
        publishedAt: new Date("2024-01-15"),
      },
      {
        title: "Building Scalable APIs with Node.js and Express",
        slug: "building-scalable-apis-nodejs-express",
        content: `# Building Scalable APIs with Node.js and Express

Creating robust and scalable APIs is crucial for modern web applications. In this post, we'll explore best practices for building APIs using Node.js and Express.js.

## Why Node.js for APIs?

Node.js has become a popular choice for API development due to:
- **Performance**: Event-driven, non-blocking I/O model
- **JavaScript Everywhere**: Same language for frontend and backend
- **Rich Ecosystem**: NPM packages for almost everything
- **Active Community**: Large, supportive developer community

## Setting Up Your Express API

\`\`\`javascript
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Best Practices

### 1. Use Middleware for Common Tasks
- Authentication and authorization
- Request validation
- Error handling
- Logging

### 2. Implement Proper Error Handling
- Use try-catch blocks
- Create custom error classes
- Return consistent error responses

### 3. Database Design
- Use proper indexing
- Implement connection pooling
- Consider database transactions

### 4. Security Considerations
- Validate all inputs
- Use HTTPS in production
- Implement rate limiting
- Sanitize user data

## Conclusion

Building scalable APIs requires careful planning and following best practices. Start simple, test thoroughly, and iterate based on your application's needs.`,
        excerpt: "Learn how to build robust and scalable APIs using Node.js and Express.js, covering best practices, security, and performance optimization.",
        featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
        status: "published",
        authorId: 2,
        viewCount: 89,
        publishedAt: new Date("2024-01-20"),
      },
      {
        title: "Database Design Principles for Modern Applications",
        slug: "database-design-principles-modern-applications",
        content: `# Database Design Principles for Modern Applications

Good database design is the foundation of any successful application. Let's explore the key principles that will help you create efficient, scalable, and maintainable databases.

## Understanding Database Types

### Relational Databases (SQL)
- **MySQL/PostgreSQL**: Traditional, ACID-compliant databases
- **Use Case**: Complex relationships, transactions, data integrity
- **Pros**: Mature, standardized, strong consistency
- **Cons**: Can be complex to scale horizontally

### NoSQL Databases
- **MongoDB**: Document-based database
- **Redis**: In-memory key-value store
- **Use Case**: Flexible schemas, horizontal scaling
- **Pros**: Flexible, scalable, developer-friendly
- **Cons**: Eventual consistency, less mature tooling

## Design Principles

### 1. Normalization vs. Denormalization
- **Normalization**: Reduces data redundancy
- **Denormalization**: Improves read performance
- **Balance**: Choose based on your read/write patterns

### 2. Indexing Strategy
\`\`\`sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_blog_status ON blogs(status);
CREATE INDEX idx_blog_published_at ON blogs(published_at);
\`\`\`

### 3. Data Types and Constraints
- Use appropriate data types
- Implement foreign key constraints
- Add check constraints for business rules

## Performance Optimization

### Query Optimization
- Use EXPLAIN to analyze query execution
- Avoid N+1 queries
- Use pagination for large datasets
- Implement query caching

### Connection Management
- Use connection pooling
- Monitor connection limits
- Implement connection retry logic

## Conclusion

Database design is both an art and a science. Start with a solid foundation, monitor performance, and be prepared to refactor as your application grows.`,
        excerpt: "Essential database design principles for modern applications, covering SQL vs NoSQL, normalization, indexing, and performance optimization strategies.",
        featuredImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop",
        status: "published",
        authorId: 3,
        viewCount: 234,
        publishedAt: new Date("2024-01-25"),
      },
      {
        title: "Docker and Containerization Best Practices",
        slug: "docker-containerization-best-practices",
        content: `# Docker and Containerization Best Practices

Containerization has revolutionized how we deploy and manage applications. Let's explore Docker best practices that will make your applications more reliable and efficient.

## Why Docker?

Docker provides several key benefits:
- **Consistency**: Same environment across development, testing, and production
- **Portability**: Run anywhere Docker is supported
- **Efficiency**: Better resource utilization than VMs
- **Scalability**: Easy horizontal scaling

## Dockerfile Best Practices

### 1. Use Multi-stage Builds
\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### 2. Optimize Layer Caching
- Put frequently changing files last
- Use .dockerignore to exclude unnecessary files
- Combine RUN commands to reduce layers

### 3. Security Considerations
- Don't run as root user
- Use specific image versions
- Regularly update base images
- Scan for vulnerabilities

## Docker Compose for Development

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - database
  
  database:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: myapp
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
\`\`\`

## Production Deployment

### Health Checks
\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

### Resource Limits
\`\`\`yaml
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
    reservations:
      memory: 256M
      cpus: '0.25'
\`\`\`

## Monitoring and Logging

- Use structured logging
- Implement metrics collection
- Set up proper monitoring dashboards
- Configure alerts for critical issues

## Conclusion

Docker and containerization are essential skills for modern developers. Start with the basics, follow best practices, and gradually explore advanced features as your needs grow.`,
        excerpt: "Comprehensive guide to Docker and containerization best practices, covering Dockerfile optimization, security, deployment strategies, and monitoring.",
        featuredImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop",
        status: "published",
        authorId: 4,
        viewCount: 312,
        publishedAt: new Date("2024-02-01"),
      },
      {
        title: "Introduction to TypeScript: A Beginner's Guide",
        slug: "introduction-typescript-beginners-guide",
        content: `# Introduction to TypeScript: A Beginner's Guide

TypeScript has become an essential tool for JavaScript developers. Let's explore what TypeScript is, why you should use it, and how to get started.

## What is TypeScript?

TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds optional static type checking along with the latest ECMAScript features.

### Key Benefits
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as inline documentation
- **Easier Refactoring**: Safe code changes across large codebases

## Basic Types

\`\`\`typescript
// Primitive types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Objects
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
\`\`\`

## Advanced Types

### Union Types
\`\`\`typescript
type Status = "pending" | "approved" | "rejected";

function updateStatus(status: Status) {
  // TypeScript ensures only valid statuses are used
}
\`\`\`

### Generic Types
\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let result = identity<string>("hello");
\`\`\`

### Utility Types
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Pick specific properties
type UserBasic = Pick<User, "id" | "name">;

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;
\`\`\`

## Setting Up TypeScript

### Installation
\`\`\`bash
npm install -g typescript
npm install --save-dev @types/node
\`\`\`

### TypeScript Configuration
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
\`\`\`

## Best Practices

1. **Start Gradually**: Begin with basic types and add complexity over time
2. **Use Strict Mode**: Enable strict type checking for better type safety
3. **Leverage Type Inference**: Let TypeScript infer types when possible
4. **Create Reusable Types**: Define interfaces and types for common patterns
5. **Use Utility Types**: Take advantage of built-in utility types

## Common Pitfalls

- **Any Type Overuse**: Avoid using \`any\` type excessively
- **Type Assertions**: Use type assertions sparingly and carefully
- **Complex Types**: Don't over-engineer your type definitions

## Conclusion

TypeScript is a powerful tool that can significantly improve your JavaScript development experience. Start with the basics, practice regularly, and gradually explore advanced features.`,
        excerpt: "Complete beginner's guide to TypeScript, covering basic and advanced types, setup, best practices, and common pitfalls to avoid.",
        featuredImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
        status: "draft",
        authorId: 2,
        viewCount: 45,
      },
    ]);

    console.log(`✅ Created ${sampleBlogs.length} blog posts`);
    console.log("🎉 Database seeding completed successfully!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seed().catch(console.error);
