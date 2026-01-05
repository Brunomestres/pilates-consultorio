import {
  pgTable,
  uuid,
  varchar,
  date,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { studios } from "./studios";
import { relations } from "drizzle-orm";
import { clients } from "./client";
import { appointments_status } from "./appointment-status";

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  studio_id: uuid("studio_id")
    .references(() => studios.studio_id)
    .notNull(),
  client_id: uuid("client_id")
    .references(() => clients.id)
    .notNull(),
  date: date("date").notNull(),
  hour: date("hour").notNull(),
  duration_minutes: varchar("duration_minutes", { length: 10 }).notNull(),
  status: uuid("status")
    .notNull()
    .references(() => appointments_status.id)
    .notNull(),
  created_by_user_id: text("created_by_user_id").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  studio: one(studios, {
    fields: [appointments.studio_id],
    references: [studios.studio_id],
  }),
  client: one(clients, {
    fields: [appointments.client_id],
    references: [clients.id],
  }),
  status: one(appointments_status, {
    fields: [appointments.status],
    references: [appointments_status.id],
  }),
}));
