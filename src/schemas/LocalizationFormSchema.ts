import { z } from "zod";

export const localizationFormSchema = z.object({
  postcode: z.string().optional(),
  city: z.string(),
  neighborhood: z.string(),
});

export type LocalizationFormValues = z.infer<typeof localizationFormSchema>;
