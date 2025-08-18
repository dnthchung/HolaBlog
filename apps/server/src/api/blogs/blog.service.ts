import { db } from "../../db/index.js";
import { blogs, users } from "../../db/tables.js";
import { eq, desc, like, and } from "drizzle-orm";
import type { insertBlogSchema } from "./blog.schema.js";
import type { z } from "zod";

export class BlogService {
  async getAllBlogs(filters: {
    status?: string;
    search?: string;
    author?: string;
    limit: number;
    page: number;
  }) {
    // TODO: Implement get all blogs with filters logic
    const conditions = [];
    
    if (filters.status) {
      conditions.push(eq(blogs.status, filters.status));
    }
    
    if (filters.search) {
      conditions.push(like(blogs.title, `%${filters.search}%`));
    }
    
    if (filters.author) {
      const authorId = Number(filters.author);
      if (!Number.isNaN(authorId)) {
        conditions.push(eq(blogs.authorId, authorId));
      }
    }

    const offset = (filters.page - 1) * filters.limit;

    const base = db
      .select({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        excerpt: blogs.excerpt,
        featuredImage: blogs.featuredImage,
        status: blogs.status,
        viewCount: blogs.viewCount,
        publishedAt: blogs.publishedAt,
        createdAt: blogs.createdAt,
        updatedAt: blogs.updatedAt,
        author: {
          id: users.id,
          username: users.username,
          fullName: users.fullName,
          avatar: users.avatar,
        },
      })
      .from(blogs)
      .leftJoin(users, eq(blogs.authorId, users.id));

    const filtered = conditions.length > 0
      ? base.where(and(...conditions))
      : base;

    const allBlogs = await filtered
      .orderBy(desc(blogs.createdAt))
      .limit(filters.limit)
      .offset(offset);

    return allBlogs;
  }

  async getBlogBySlug(slug: string) {
    // TODO: Implement get blog by slug logic
    const blog = await db
      .select({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        content: blogs.content,
        excerpt: blogs.excerpt,
        featuredImage: blogs.featuredImage,
        status: blogs.status,
        viewCount: blogs.viewCount,
        publishedAt: blogs.publishedAt,
        createdAt: blogs.createdAt,
        updatedAt: blogs.updatedAt,
        author: {
          id: users.id,
          username: users.username,
          fullName: users.fullName,
          bio: users.bio,
          avatar: users.avatar,
        },
      })
      .from(blogs)
      .leftJoin(users, eq(blogs.authorId, users.id))
      .where(eq(blogs.slug, slug));

    return blog.length > 0 ? blog[0] : null;
  }

  async incrementViewCount(blogId: number, currentViews: number) {
    // TODO: Implement increment view count logic
    await db
      .update(blogs)
      .set({ viewCount: currentViews + 1 })
      .where(eq(blogs.id, blogId));
  }

  async createBlog(blogData: z.infer<typeof insertBlogSchema>) {
    // TODO: Implement create blog logic
    const result = await db.insert(blogs).values(blogData);
    const insertedId = Array.isArray(result) ? (result[0] as any).insertId : undefined;
    return { id: insertedId };
  }

  async updateBlog(id: number, blogData: Partial<z.infer<typeof insertBlogSchema>>) {
    // TODO: Implement update blog logic
    const upd = await db.update(blogs).set(blogData).where(eq(blogs.id, id));
    const affected = Array.isArray(upd) ? (upd[0] as any).affectedRows : 0;
    return affected > 0;
  }

  async deleteBlog(id: number) {
    // TODO: Implement delete blog logic
    const del = await db.delete(blogs).where(eq(blogs.id, id));
    const deleted = Array.isArray(del) ? (del[0] as any).affectedRows : 0;
    return deleted > 0;
  }
}
