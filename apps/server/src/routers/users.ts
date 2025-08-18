import { Router, type Request, type Response } from "express";
import { db } from "../db/index.js";
import { users, insertUserSchema, selectUserSchema } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router: Router = Router();

// GET /api/users - Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users);
    res.json({
      success: true,
      data: allUsers,
      count: allUsers.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch users",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID",
      });
    }

    const user = await db.select().from(users).where(eq(users.id, userId));
    
    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: user[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// POST /api/users - Create new user
router.post("/", async (req: Request, res: Response) => {
  try {
    const validatedData = insertUserSchema.parse(req.body);
    
    const result = await db.insert(users).values(validatedData);
    const insertedId = Array.isArray(result) ? (result[0] as any).insertId : undefined;
    
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { id: insertedId },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Failed to create user",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// PUT /api/users/:id - Update user
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID",
      });
    }

    const validatedData = insertUserSchema.partial().parse(req.body);
    
    const upd = await db.update(users)
      .set(validatedData)
      .where(eq(users.id, userId));

    const affected = Array.isArray(upd) ? (upd[0] as any).affectedRows : 0;

    if (affected === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Failed to update user",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// DELETE /api/users/:id - Delete user
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID",
      });
    }

    const del = await db.delete(users).where(eq(users.id, userId));
    const deleted = Array.isArray(del) ? (del[0] as any).affectedRows : 0;

    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete user",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
