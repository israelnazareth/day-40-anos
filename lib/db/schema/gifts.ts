import {
  pgTable,
  text,
  numeric,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { events } from "./events";

export const gifts = pgTable("gifts", {
  id: uuid("id").defaultRandom().primaryKey(),

  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id),

  name: text("name").notNull(),

  description: text("description"),

  image: text("image"),

  price: numeric("price", {
    precision: 10,
    scale: 2,
  }),

  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),
});
