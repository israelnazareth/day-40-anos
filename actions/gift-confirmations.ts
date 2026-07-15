"use server";

import { revalidatePath } from "next/cache";

import { giftConfirmationSchema } from "@/schemas/gift-confirmations";

import { createGiftConfirmation } from "@/lib/db/queries/gift-confirmations";

export async function createGiftConfirmationAction(input: unknown) {
  const parsed = giftConfirmationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  await createGiftConfirmation(parsed.data);

  revalidatePath("/admin");

  return {
    success: true,
  };
}
