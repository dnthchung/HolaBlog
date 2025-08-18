import { mysqlTable, serial, varchar, text, timestamp, int, datetime } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Users table
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  fullName: varchar("full_name", { length: 100 }),
  bio: text("bio"),
  avatar: varchar("avatar", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Blogs table
export const blogs = mysqlTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: varchar("featured_image", { length: 255 }),
  status: varchar("status", { length: 20 }).default("draft").notNull(), // draft, published, archived
  viewCount: int("view_count").default(0),
  authorId: int("author_id").notNull(),
  publishedAt: datetime("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Schema validation using Zod
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertBlogSchema = createInsertSchema(blogs);
export const selectBlogSchema = createSelectSchema(blogs);

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
