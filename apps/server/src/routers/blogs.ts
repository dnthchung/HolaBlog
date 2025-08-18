// import { Router, type Request, type Response } from "express";
// import { db } from "../db/index.js";
// import { blogs, users, insertBlogSchema } from "../db/schema.js";
// import { eq, desc, like, and } from "drizzle-orm";

// const router: Router = Router();

// // GET /api/blogs - Get all blogs with optional filters
// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const { status, search, author, limit = "10", page = "1" } = req.query;
    
//     // Build conditions
//     const conditions = [];
    
//     if (status && typeof status === "string") {
//       conditions.push(eq(blogs.status, status));
//     }
    
//     if (search && typeof search === "string") {
//       conditions.push(like(blogs.title, `%${search}%`));
//     }
    
//     if (author && typeof author === "string") {
//       const authorId = Number(author);
//       if (!Number.isNaN(authorId)) {
//         conditions.push(eq(blogs.authorId, authorId));
//       }
//     }

//     // Add pagination
//     const limitNum = Math.min(parseInt(String(limit)) || 10, 50);
//     const pageNum = Math.max(parseInt(String(page)) || 1, 1);
//     const offset = (pageNum - 1) * limitNum;

//     // Build base query
//     const base = db
//       .select({
//         id: blogs.id,
//         title: blogs.title,
//         slug: blogs.slug,
//         excerpt: blogs.excerpt,
//         featuredImage: blogs.featuredImage,
//         status: blogs.status,
//         viewCount: blogs.viewCount,
//         publishedAt: blogs.publishedAt,
//         createdAt: blogs.createdAt,
//         updatedAt: blogs.updatedAt,
//         author: {
//           id: users.id,
//           username: users.username,
//           fullName: users.fullName,
//           avatar: users.avatar,
//         },
//       })
//       .from(blogs)
//       .leftJoin(users, eq(blogs.authorId, users.id));

//     // Apply conditions if any, otherwise use base query
//     const filtered = conditions.length > 0
//       ? base.where(and(...conditions))
//       : base;

//     const allBlogs = await filtered
//       .orderBy(desc(blogs.createdAt))
//       .limit(limitNum)
//       .offset(offset);

//     res.json({
//       success: true,
//       data: allBlogs,
//       pagination: {
//         page: pageNum,
//         limit: limitNum,
//         count: allBlogs.length,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch blogs",
//       details: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// });

// // GET /api/blogs/:slug - Get blog by slug
// router.get("/:slug", async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
    
//     const blog = await db
//       .select({
//         id: blogs.id,
//         title: blogs.title,
//         slug: blogs.slug,
//         content: blogs.content,
//         excerpt: blogs.excerpt,
//         featuredImage: blogs.featuredImage,
//         status: blogs.status,
//         viewCount: blogs.viewCount,
//         publishedAt: blogs.publishedAt,
//         createdAt: blogs.createdAt,
//         updatedAt: blogs.updatedAt,
//         author: {
//           id: users.id,
//           username: users.username,
//           fullName: users.fullName,
//           bio: users.bio,
//           avatar: users.avatar,
//         },
//       })
//       .from(blogs)
//       .leftJoin(users, eq(blogs.authorId, users.id))
//       .where(eq(blogs.slug, slug));
    
//     if (blog.length === 0) {
//       return res.status(404).json({
//         success: false,
//         error: "Blog not found",
//       });
//     }

//     // Handle nullable viewCount - default to 0 if null
//     const currentViews = blog[0].viewCount ?? 0;
//     await db
//       .update(blogs)
//       .set({ viewCount: currentViews + 1 })
//       .where(eq(blogs.id, blog[0].id));

//     res.json({
//       success: true,
//       data: { ...blog[0], viewCount: currentViews + 1 },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch blog",
//       details: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// });

// // POST /api/blogs - Create new blog
// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const validatedData = insertBlogSchema.parse(req.body);
    
//     // Generate slug from title if not provided
//     if (!validatedData.slug) {
//       validatedData.slug = validatedData.title
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)/g, "");
//     }
    
//     // Set publishedAt if status is published
//     if (validatedData.status === "published" && !validatedData.publishedAt) {
//       validatedData.publishedAt = new Date();
//     }
    
//     const result = await db.insert(blogs).values(validatedData);
//     const insertedId = Array.isArray(result) ? (result[0] as any).insertId : undefined;
    
//     res.status(201).json({
//       success: true,
//       message: "Blog created successfully",
//       data: { id: insertedId },
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: "Failed to create blog",
//       details: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// });

// // PUT /api/blogs/:id - Update blog
// router.put("/:id", async (req: Request, res: Response) => {
//   try {
//     const blogId = parseInt(req.params.id);
//     if (isNaN(blogId)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid blog ID",
//       });
//     }

//     const validatedData = insertBlogSchema.partial().parse(req.body);
    
//     // Set publishedAt if status changes to published
//     if (validatedData.status === "published" && !validatedData.publishedAt) {
//       validatedData.publishedAt = new Date();
//     }
    
//     const upd = await db.update(blogs)
//       .set(validatedData)
//       .where(eq(blogs.id, blogId));

//     const affected = Array.isArray(upd) ? (upd[0] as any).affectedRows : 0;

//     if (affected === 0) {
//       return res.status(404).json({
//         success: false,
//         error: "Blog not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Blog updated successfully",
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: "Failed to update blog",
//       details: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// });

// // DELETE /api/blogs/:id - Delete blog
// router.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     const blogId = parseInt(req.params.id);
//     if (isNaN(blogId)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid blog ID",
//       });
//     }

//     const del = await db.delete(blogs).where(eq(blogs.id, blogId));
//     const deleted = Array.isArray(del) ? (del[0] as any).affectedRows : 0;

//     if (deleted === 0) {
//       return res.status(404).json({
//         success: false,
//         error: "Blog not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Blog deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to delete blog",
//       details: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// });

// export default router;
