import { z } from "zod";

export const rsvpSchema = z.object({
  eventId: z.uuid(),

  name: z
    .string()
    .trim()
    .min(3, "Informe seu nome"),

  phone: z
    .string()
    .trim()
    .min(10, "Telefone inválido"),

  companions: z.coerce
    .number()
    .int()
    .min(0)
    .max(10),

  attendance: z.boolean(),

  message: z.string().optional(),
});

export type RSVPInput = z.infer<typeof rsvpSchema>;