import { z } from "zod";

export const localizationFormSchema = z.object({
  postcode: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  city: z.string(),
  neighborhood: z.string(),
});

export type LocalizationFormValues = z.infer<typeof localizationFormSchema>;
