import { db } from "../";

export async function getGifts(eventId: string) {
  return db.query.gifts.findMany({
    where: (gift, { eq }) => eq(gift.eventId, eventId),
    orderBy: (gift, { asc }) => [asc(gift.name)],
  });
}