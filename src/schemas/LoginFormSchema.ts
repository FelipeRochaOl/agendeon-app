import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
