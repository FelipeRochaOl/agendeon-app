import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    age: z.coerce.number().gte(18, "Idade deve ser maior que 18"),
    isBusiness: z.boolean().default(false),
    cnpj: z
      .string()
      .min(14, "CNPJ deve ter no mínimo 14 caracteres")
      .optional(),
    cpf: z.string().min(11, "CPF deve ter no mínimo 11 caracteres").optional(),
    address: z
      .object({
        street: z.string().min(3, "Rua deve ter no mínimo 3 caracteres"),
        number: z.string().min(1, "Número deve ter no mínimo 1 caracter"),
        complement: z.string(),
        neighborhood: z
          .string()
          .min(3, "Bairro deve ter no mínimo 3 caracteres"),
        city: z.string().min(3, "Cidade deve ter no mínimo 3 caracteres"),
        uf: z
          .string()
          .min(2, "UF deve ter 2 caracteres")
          .max(2, "UF deve ter 2 caracteres"),
        country: z
          .string()
          .min(2, "País deve ter 2 caracteres")
          .max(2, "País deve ter 2 caracteres")
          .default("BR"),
        zip: z.string().min(8, "CEP deve ter no mínimo 8 caracteres"),
      })
      .optional(),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Senhas não conferem",
      });
    }
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
