import { Router, type Request, type Response } from "express";
import userRouter from "./users/user.router.js";
import blogRouter from "./blogs/blog.router.js";

const router: Router = Router();

// Health check endpoint
router.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "HolaBlog API is running",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      blogs: "/api/blogs",
      health: "/api/health",
    },
  });
});

// Health check endpoint
router.get("/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Mount sub-routers
router.use("/users", userRouter);
router.use("/blogs", blogRouter);

export default router;
