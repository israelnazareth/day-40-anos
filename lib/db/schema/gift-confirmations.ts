import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { events } from "./events";
import { gifts } from "./gifts";

export const giftConfirmations = pgTable("gift_confirmations", {
  id: uuid("id").defaultRandom().primaryKey(),

  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id),

  giftId: uuid("gift_id")
    .notNull()
    .references(() => gifts.id),

  name: text("name").notNull(),

  phone: text("phone"),

  paidValue: numeric("paid_value", {
    precision: 10,
    scale: 2,
  }),

  observation: text("observation"),

  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),
});

export type GiftConfirmationsRecord = typeof giftConfirmations.$inferSelect;
