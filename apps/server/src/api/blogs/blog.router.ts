import { Router } from "express";
import { BlogController } from "./blog.controller.js";

const router: Router = Router();
const blogController = new BlogController();

// GET /api/blogs - Get all blogs with optional filters
router.get("/", blogController.getAllBlogs.bind(blogController));

// GET /api/blogs/:slug - Get blog by slug
router.get("/:slug", blogController.getBlogBySlug.bind(blogController));

// POST /api/blogs - Create new blog
router.post("/", blogController.createBlog.bind(blogController));

// PUT /api/blogs/:id - Update blog
router.put("/:id", blogController.updateBlog.bind(blogController));

// DELETE /api/blogs/:id - Delete blog
router.delete("/:id", blogController.deleteBlog.bind(blogController));

export default router;
