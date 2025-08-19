import { db } from "../../db/index.js";
import type { insertUserSchema } from "./user.schema.js";
import type { z } from "zod";

export class UserService {
  async getAllUsers() {
    const allUsers = await db.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return allUsers;
  }

  async getUserById(id: number) {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async createUser(userData: z.infer<typeof insertUserSchema>) {
    const user = await db.user.create({
      data: userData,
      select: {
        id: true,
      },
    });
    return user;
  }

  async updateUser(id: number, userData: Partial<z.infer<typeof insertUserSchema>>) {
    try {
      await db.user.update({
        where: { id },
        data: userData,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteUser(id: number) {
    try {
      await db.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
