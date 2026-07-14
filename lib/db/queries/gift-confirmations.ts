import { db } from "../";
import { giftConfirmations } from "../schema";

export async function createGiftConfirmation(
  data: typeof giftConfirmations.$inferInsert
) {
  const [confirmation] = await db
    .insert(giftConfirmations)
    .values(data)
    .returning();

  return confirmation;
}

export async function getGiftConfirmations(eventId: string) {
  return db.query.giftConfirmations.findMany({
    where: (confirmation, { eq }) =>
      eq(confirmation.eventId, eventId),
  });
}