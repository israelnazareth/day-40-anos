import { db } from "../";
import { gifts } from "../schema";
import type { Gift } from "@/types/forms";
import { eq } from "drizzle-orm";

export async function getGifts(eventId: string): Promise<Gift[]> {
  const gifts = await db.query.gifts.findMany({
    where: (gift, { eq }) => eq(gift.eventId, eventId),
    orderBy: (gift, { asc }) => [asc(gift.name)],
  });

  return gifts;
}

export async function getGiftById(id: string): Promise<Gift | null> {
  const gift = await db.query.gifts.findFirst({
    where: (gift, { eq }) => eq(gift.id, id),
  });

  return gift ?? null;
}

export async function createGift(data: {
  eventId: string;
  name: string;
  description: string | null;
  image: string;
  price: string;
}): Promise<Gift> {
  const [gift] = await db
    .insert(gifts)
    .values({
      eventId: data.eventId,
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
    })
    .returning();

  return gift;
}

export async function updateGift(
  id: string,
  data: {
    name?: string;
    description?: string | null;
    image?: string;
    price?: string;
  },
): Promise<Gift> {
  const [gift] = await db
    .update(gifts)
    .set(data)
    .where(eq(gifts.id, id))
    .returning();

  return gift;
}

export async function deleteGift(id: string): Promise<void> {
  await db.delete(gifts).where(eq(gifts.id, id));
}
