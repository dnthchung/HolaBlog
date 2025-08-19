import { z } from "zod";

// Base schemas
export const insertBlogSchema = z.object({
  title: z.string().max(255),
  slug: z.string().max(255),
  content: z.string(),
  excerpt: z.string().optional(),
  featuredImage: z.string().max(255).optional(),
  status: z.string().max(20).default("draft"),
  viewCount: z.number().default(0).optional(),
  authorId: z.number(),
  publishedAt: z.date().optional(),
});

export const selectBlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  featuredImage: z.string().nullable(),
  status: z.string(),
  viewCount: z.number(),
  authorId: z.number(),
  publishedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

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
export type Blog = z.infer<typeof selectBlogSchema>;
export type NewBlog = z.infer<typeof insertBlogSchema>;
