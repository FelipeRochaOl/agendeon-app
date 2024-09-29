import { z } from "zod";

export const localizationFormSchema = z.object({
  postcode: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
});

export type LocalizationFormValues = z.infer<typeof localizationFormSchema>;
