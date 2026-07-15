import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),

  slug: text("slug").notNull(),

  title: text("title").notNull(),

  subtitle: text("subtitle"),

  description: text("description"),

  eventDate: timestamp("event_date", {
    mode: "date",
  }).notNull(),

  venueName: text("venue_name").notNull(),

  address: text("address").notNull(),

  mapsUrl: text("maps_url").notNull(),

  mapsEmbed: text("maps_embed").notNull(),

  pixKey: text("pix_key").notNull(),

  pixName: text("pix_name").notNull(),

  whatsapp: text("whatsapp").notNull(),

  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow().notNull(),

  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).defaultNow().notNull(),
});