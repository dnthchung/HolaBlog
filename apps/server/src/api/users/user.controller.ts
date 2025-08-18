import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
import { insertUserSchema } from "./user.schema.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      // TODO: Implement controller logic for getting all users
      const users = await this.userService.getAllUsers();
      res.json({
        success: true,
        data: users,
        count: users.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch users",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      // TODO: Implement controller logic for getting user by ID
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid user ID",
        });
      }

      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch user",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      // TODO: Implement controller logic for creating user
      const validatedData = insertUserSchema.parse(req.body);
      const newUser = await this.userService.createUser(validatedData);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: "Failed to create user",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      // TODO: Implement controller logic for updating user
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid user ID",
        });
      }

      const validatedData = insertUserSchema.partial().parse(req.body);
      const updated = await this.userService.updateUser(userId, validatedData);

      if (!updated) {
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
  }

  async deleteUser(req: Request, res: Response) {
    try {
      // TODO: Implement controller logic for deleting user
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid user ID",
        });
      }

      const deleted = await this.userService.deleteUser(userId);

      if (!deleted) {
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
  }
}
