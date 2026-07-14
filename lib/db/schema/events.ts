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

  venueName: text("venue_name"),

  address: text("address"),

  mapsUrl: text("maps_url"),

  mapsEmbed: text("maps_embed"),

  pixKey: text("pix_key"),

  pixName: text("pix_name"),

  whatsapp: text("whatsapp"),

  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),

  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).defaultNow(),
});