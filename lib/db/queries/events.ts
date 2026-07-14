import { db } from "../";

export async function getEventBySlug(slug: string) {
  return db.query.events.findFirst({
    where: (event, { eq }) => eq(event.slug, slug),
  });
}

export async function getEvents() {
  return db.query.events.findMany();
}