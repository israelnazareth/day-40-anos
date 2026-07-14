import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const admins = pgTable("admins", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name"),

  email: text("email").notNull(),

  passwordHash: text("password_hash"),

  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),
});