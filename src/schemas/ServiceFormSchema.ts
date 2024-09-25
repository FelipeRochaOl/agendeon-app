import { z } from "zod";

export const serviceFormSchema = z.object({
  code: z.string().optional(),
  description: z.string().min(1, "Sessão é obrigatória"),
  value: z.coerce
    .number()
    .min(1, "Valor é obrigatório")
    .nonnegative("Valor não pode ser negativo"),
  duration: z.coerce
    .number()
    .min(1, "Duração é obrigatória em segundos")
    .nonnegative("Duração não pode ser negativa"),
  companyId: z.string().optional(),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;
