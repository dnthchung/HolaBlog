import type { Request, Response } from "express";
import { BlogService } from "./blog.service.js";
import { insertBlogSchema } from "./blog.schema.js";

export class BlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  async getAllBlogs(req: Request, res: Response) {
    try {
      // TODO: Implement controller logic for getting all blogs
      const { status, search, author, limit = "10", page = "1" } = req.query;

      const limitNum = Math.min(parseInt(String(limit)) || 10, 50);
      const pageNum = Math.max(parseInt(String(page)) || 1, 1);

      const blogs = await this.blogService.getAllBlogs({
        status: status as string,
        search: search as string,
        author: author as string,
        limit: limitNum,
        page: pageNum,
      });

      res.json({
        success: true,
        data: blogs,
        pagination: {
          page: pageNum,
          limit: limitNum,
          count: blogs.length,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch blogs",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getBlogBySlug(req: Request, res: Response) {
    try {
      // TODO: Implement controller logic for getting blog by slug
      const { slug } = req.params;

      const blog = await this.blogService.getBlogBySlug(slug);
      if (!blog) {
        return res.status(404).json({
          success: false,
          error: "Blog not found",
        });
      }

      // Handle nullable viewCount - default to 0 if null
      const currentViews = blog.viewCount ?? 0;
      await this.blogService.incrementViewCount(blog.id, currentViews);

      res.json({
        success: true,
        data: { ...blog, viewCount: currentViews + 1 },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch blog",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async createBlog(req: Request, res: Response) {
    try {
      // TODO: Implement controller logic for creating blog
      const validatedData = insertBlogSchema.parse(req.body);

      // Generate slug from title if not provided
      if (!validatedData.slug) {
        validatedData.slug = validatedData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }

      // Set publishedAt if status is published
      if (validatedData.status === "published" && !validatedData.publishedAt) {
        validatedData.publishedAt = new Date();
      }

      const newBlog = await this.blogService.createBlog(validatedData);

      res.status(201).json({
        success: true,
        message: "Blog created successfully",
        data: newBlog,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: "Failed to create blog",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async updateBlog(req: Request, res: Response) {
    try {
      // TODO: Implement controller logic for updating blog
      const blogId = parseInt(req.params.id);
      if (isNaN(blogId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid blog ID",
        });
      }

      const validatedData = insertBlogSchema.partial().parse(req.body);

      // Set publishedAt if status changes to published
      if (validatedData.status === "published" && !validatedData.publishedAt) {
        validatedData.publishedAt = new Date();
      }

      const updated = await this.blogService.updateBlog(blogId, validatedData);

      if (!updated) {
        return res.status(404).json({
          success: false,
          error: "Blog not found",
        });
      }

      res.json({
        success: true,
        message: "Blog updated successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: "Failed to update blog",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async deleteBlog(req: Request, res: Response) {
    try {
      // TODO: Implement controller logic for deleting blog
      const blogId = parseInt(req.params.id);
      if (isNaN(blogId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid blog ID",
        });
      }

      const deleted = await this.blogService.deleteBlog(blogId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: "Blog not found",
        });
      }

      res.json({
        success: true,
        message: "Blog deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to delete blog",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
