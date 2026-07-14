import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { events } from "./events";

export const rsvps = pgTable("rsvps", {
  id: uuid("id").defaultRandom().primaryKey(),

  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id),

  name: text("name").notNull(),

  phone: text("phone"),

  companions: integer("companions").default(0),

  attendance: boolean("attendance"),

  message: text("message"),

  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),
});
