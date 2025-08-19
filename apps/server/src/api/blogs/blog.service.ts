import { db } from "../../db/index.js";
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
    const where: any = {};
    
    if (filters.status) {
      where.status = filters.status;
    }
    
    if (filters.search) {
      where.title = {
        contains: filters.search,
        mode: 'insensitive',
      };
    }
    
    if (filters.author) {
      const authorId = Number(filters.author);
      if (!Number.isNaN(authorId)) {
        where.authorId = authorId;
      }
    }

    const offset = (filters.page - 1) * filters.limit;

    const allBlogs = await db.blog.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        status: true,
        viewCount: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: filters.limit,
    });

    return allBlogs;
  }

  async getBlogBySlug(slug: string) {
    const blog = await db.blog.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        excerpt: true,
        featuredImage: true,
        status: true,
        viewCount: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            username: true,
            fullName: true,
            bio: true,
            avatar: true,
          },
        },
      },
    });

    return blog;
  }

  async incrementViewCount(blogId: number, currentViews: number) {
    await db.blog.update({
      where: { id: blogId },
      data: { viewCount: currentViews + 1 },
    });
  }

  async createBlog(blogData: z.infer<typeof insertBlogSchema>) {
    const blog = await db.blog.create({
      data: blogData,
      select: {
        id: true,
      },
    });
    return blog;
  }

  async updateBlog(id: number, blogData: Partial<z.infer<typeof insertBlogSchema>>) {
    try {
      await db.blog.update({
        where: { id },
        data: blogData,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteBlog(id: number) {
    try {
      await db.blog.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
