import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { studios } from "./studios";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  user_d: uuid("user_d").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }).notNull(),
  active: boolean("active").default(true).notNull(),
  cpf_cnpj: varchar("cpf_cnpj", { length: 20 }).unique(),
  birth_date: date("birth_date"),
  studio_id: uuid("studio_id")
    .references(() => studios.studio_id)
    .notNull(),
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
});

export const userRelations = relations(users, ({ one }) => ({
  studio: one(studios, {
    fields: [users.studio_id],
    references: [studios.studio_id],
  }),
}));
