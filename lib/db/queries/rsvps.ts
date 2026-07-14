import { db } from "../";
import { rsvps } from "../schema";

export async function createRSVP(data: typeof rsvps.$inferInsert) {
  const [rsvp] = await db
    .insert(rsvps)
    .values(data)
    .returning();

  return rsvp;
}

export async function getRSVPs(eventId: string) {
  return db.query.rsvps.findMany({
    where: (rsvp, { eq }) => eq(rsvp.eventId, eventId),
  });
}