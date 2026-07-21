import { z } from "zod";

export const createGiftSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(80),
  description: z
    .string()
    .max(300, "Descrição deve ter no máximo 300 caracteres")
    .nullable(),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Preço deve ser um número positivo",
  }),
  image: z
    .instanceof(File, { message: "Imagem é obrigatória" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "A imagem deve ter no máximo 5MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Apenas JPG, PNG e WebP são permitidos",
    ),
});

export const updateGiftSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(80)
    .optional(),
  description: z
    .string()
    .max(300, "Descrição deve ter no máximo 300 caracteres")
    .nullable()
    .optional(),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Preço deve ser um número positivo",
    })
    .optional(),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "A imagem deve ter no máximo 5MB",
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Apenas JPG, PNG e WebP são permitidos",
    ),
});
