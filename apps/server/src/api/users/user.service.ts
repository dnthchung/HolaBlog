import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import type { insertUserSchema } from "../../db/schema.js";
import type { z } from "zod";

export class UserService {
  async getAllUsers() {
    // TODO: Implement get all users logic
    const allUsers = await db.select().from(users);
    return allUsers;
  }

  async getUserById(id: number) {
    // TODO: Implement get user by ID logic
    const user = await db.select().from(users).where(eq(users.id, id));
    return user.length > 0 ? user[0] : null;
  }

  async createUser(userData: z.infer<typeof insertUserSchema>) {
    // TODO: Implement create user logic
    const result = await db.insert(users).values(userData);
    const insertedId = Array.isArray(result) ? (result[0] as any).insertId : undefined;
    return { id: insertedId };
  }

  async updateUser(id: number, userData: Partial<z.infer<typeof insertUserSchema>>) {
    // TODO: Implement update user logic
    const upd = await db.update(users).set(userData).where(eq(users.id, id));
    const affected = Array.isArray(upd) ? (upd[0] as any).affectedRows : 0;
    return affected > 0;
  }

  async deleteUser(id: number) {
    // TODO: Implement delete user logic
    const del = await db.delete(users).where(eq(users.id, id));
    const deleted = Array.isArray(del) ? (del[0] as any).affectedRows : 0;
    return deleted > 0;
  }
}
