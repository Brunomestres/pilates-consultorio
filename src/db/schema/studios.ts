import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const studios = pgTable("studios", {
  studio_id: uuid("studio_id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }).notNull(),
  active: boolean("active").default(true).notNull(),
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
});
