import { Router, type Request, type Response } from "express";
import userRouter from "./users/user.router.js";
import blogRouter from "./blogs/blog.router.js";

const router: Router = Router();

// API Info endpoint
router.get("/", (req: Request, res: Response) => {
  const apiVersion = process.env.API_VERSION || "v1";
  res.json({
    success: true,
    message: "HolaBlog API is running",
    version: "1.0.0",
    endpoints: {
      users: `/api/${apiVersion}/users`,
      blogs: `/api/${apiVersion}/blogs`,
    },
  });
});

// Mount sub-routers
router.use("/users", userRouter);
router.use("/blogs", blogRouter);

export default router;
