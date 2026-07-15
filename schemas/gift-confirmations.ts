import { z } from "zod";

export const giftConfirmationSchema = z.object({
  eventId: z.uuid(),

  giftId: z.uuid(),

  name: z.string().trim().min(3, "Informe seu nome"),

  phone: z.string().trim().min(10, "Telefone inválido").optional(),

  paidValue: z.string().optional(),

  observation: z.string().optional(),
});

export type GiftConfirmationInput = z.infer<typeof giftConfirmationSchema>;
