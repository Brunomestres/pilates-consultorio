import { db } from "@/config/db/drizzle";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function getUserFromDb(email: string) {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));

    return user[0] || null;
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    throw error;
  }
}
