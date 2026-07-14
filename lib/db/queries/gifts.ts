import { db } from "../";
import type { Gift } from "@/types/forms";

export async function getGifts(eventId: string): Promise<Gift[]> {
  const gifts = await db.query.gifts.findMany({
    where: (gift, { eq }) => eq(gift.eventId, eventId),
    orderBy: (gift, { asc }) => [asc(gift.name)],
  });

  return gifts.map((gift) => ({
    ...gift,
    price: gift.price ? parseFloat(gift.price) : 0,
  }));
}
