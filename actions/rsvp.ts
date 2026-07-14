"use server";

import { revalidatePath } from "next/cache";

import { rsvpSchema } from "@/schemas/rsvp";

import { createRSVP } from "@/lib/db/queries/rsvps";

export async function createRSVPAction(input: unknown) {
  const parsed = rsvpSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  await createRSVP(parsed.data);

  revalidatePath("/admin");

  return {
    success: true,
  };
}