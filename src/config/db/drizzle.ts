import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../env";

export async function main() {
  const client = postgres(env.DATABASE_URL);
  const db = drizzle(client);
  return db;
}

export const db = await main();
