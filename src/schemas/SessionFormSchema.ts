import { z } from "zod";

export const sessionFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

export type SessionFormValues = z.infer<typeof sessionFormSchema>;
