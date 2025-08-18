import { Router } from "express";
import { UserController } from "./user.controller.js";

const router: Router = Router();
const userController = new UserController();

// GET /api/users - Get all users
router.get("/", userController.getAllUsers.bind(userController));

// GET /api/users/:id - Get user by ID
router.get("/:id", userController.getUserById.bind(userController));

// POST /api/users - Create new user
router.post("/", userController.createUser.bind(userController));

// PUT /api/users/:id - Update user
router.put("/:id", userController.updateUser.bind(userController));

// DELETE /api/users/:id - Delete user
router.delete("/:id", userController.deleteUser.bind(userController));

export default router;
