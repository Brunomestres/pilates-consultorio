import {
  pgTable,
  uuid,
  varchar,
  date,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { studios } from "./studios";
import { relations } from "drizzle-orm";

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  studio_id: uuid("studio_id")
    .references(() => studios.studio_id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }).notNull(),
  cpf_cnpj: varchar("cpf_cnpj", { length: 20 }).unique(),
  birth_date: date("birth_date"),
  active: boolean("active").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const clientsRelations = relations(clients, ({ one }) => ({
  studio: one(studios, {
    fields: [clients.studio_id],
    references: [studios.studio_id],
  }),
}));
