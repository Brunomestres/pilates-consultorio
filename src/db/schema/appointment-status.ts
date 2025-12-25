import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const appointments_status = pgTable("appointments_status", {
  id: uuid("id").primaryKey().defaultRandom(),
  status: varchar("status", { length: 50 }).notNull(),
});
