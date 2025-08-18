import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { blogs } from "../../db/tables.js";

// Drizzle-generated schemas
export const insertBlogSchema = createInsertSchema(blogs);
export const selectBlogSchema = createSelectSchema(blogs);

// DTOs and validation schemas
export const createBlogDto = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().optional(),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  featuredImage: z.string().url().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  authorId: z.number(),
  publishedAt: z.date().optional(),
});

export const updateBlogDto = createBlogDto.partial();

export const getBlogParamsDto = z.object({
  id: z.string().transform(val => parseInt(val)).refine(val => !isNaN(val), {
    message: "Invalid blog ID"
  }),
});

export const getBlogBySlugParamsDto = z.object({
  slug: z.string().min(1),
});

export const getBlogsQueryDto = z.object({
  status: z.string().optional(),
  search: z.string().optional(),
  author: z.string().optional(),
  limit: z.string().default("10"),
  page: z.string().default("1"),
});

// Type exports  
export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
