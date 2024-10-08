import { z } from "zod";

export const categoryFormSchema = z.object({
  code: z.string().optional(),
  session: z.string().min(1, "Sessão é obrigatória"),
  name: z.string().min(1, "Nome é obrigatório"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
