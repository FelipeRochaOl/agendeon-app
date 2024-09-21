import { z } from "zod";

export const sessionFormSchema = z.object({
  code: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
});

export type SessionFormValues = z.infer<typeof sessionFormSchema>;
