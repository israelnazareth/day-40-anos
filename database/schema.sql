CREATE TYPE "STATUS" AS ENUM (
	'AVAILABLE',
	'RESERVED',
	'CONFIRMED'
);

CREATE TABLE IF NOT EXISTS "admins" (
	"id" UUID DEFAULT gen_random_uuid(),
	"name" TEXT,
	"email" TEXT UNIQUE,
	"password_hash" TEXT,
	"created_at" TIMESTAMP DEFAULT now(),
	PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "events" (
	"id" UUID DEFAULT gen_random_uuid(),
	"slug" TEXT NOT NULL UNIQUE,
	"title" TEXT NOT NULL,
	"subtitle" TEXT,
	"description" TEXT,
	"event_date" TIMESTAMP NOT NULL,
	"venue_name" TEXT,
	"address" TEXT,
	"maps_url" TEXT,
	"maps_embed" TEXT,
	"pix_key" TEXT,
	"pix_name" TEXT,
	"whatsapp" TEXT,
	"created_at" TIMESTAMP DEFAULT now(),
	"updated_at" TIMESTAMP DEFAULT now(),
	PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "gift_confirmations" (
	"id" UUID DEFAULT gen_random_uuid(),
	"event_id" UUID,
	"gift_id" UUID,
	"name" TEXT NOT NULL,
	"phone" TEXT,
	"observation" TEXT,
	"paid_value" NUMERIC(10,2),
	"created_at" TIMESTAMP DEFAULT now(),
	PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "gifts" (
	"id" UUID DEFAULT gen_random_uuid(),
	"event_id" UUID,
	"name" TEXT NOT NULL,
	"description" TEXT,
	"image" TEXT,
	"price" NUMERIC(10,2),
	"status" "STATUS" DEFAULT 'AVAILABLE',
	"created_at" TIMESTAMP DEFAULT now(),
	PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "rsvps" (
	"id" UUID DEFAULT gen_random_uuid(),
	"event_id" UUID,
	"name" TEXT NOT NULL,
	"phone" TEXT,
	"companions" INTEGER DEFAULT 0,
	"attendance" BOOLEAN,
	"message" TEXT,
	"created_at" TIMESTAMP DEFAULT now(),
	PRIMARY KEY("id")
);

-- DROP TABLE IF EXISTS "admins", "events", "gift_confirmations", "gifts", "rsvps";