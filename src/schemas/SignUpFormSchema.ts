import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    age: z.coerce.number().optional(),
    isBusiness: z.boolean().default(false),
    tradeName: z.string().optional(),
    cnpj: z.string().optional(),
    cpf: z.string().optional(),
    sessionId: z.string().optional(),
    categoryId: z.string().optional(),
    address: z
      .object({
        street: z.string().optional(),
        number: z.string().optional(),
        complement: z.string().optional(),
        neighborhood: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        uf: z.string().optional(),
        country: z.string().optional().default("BR"),
        zip: z.string().optional(),
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
    if (data.isBusiness) {
      if (!data.cnpj) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cnpj"],
          message: "CNPJ é obrigatório",
        });
      }
      if (data.cnpj && data.cnpj.length < 14) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cnpj"],
          message: "CNPJ deve ter no mínimo 14 caracteres",
        });
      }
      if (!data.tradeName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tradeName"],
          message: "Nome fantasia é obrigatório",
        });
      }
      if (data.address?.zip && data.address.zip.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "zip"],
          message: "CEP deve ter no mínimo 8 caracteres",
        });
      }
      if (data.address?.state && data.address.state.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "state"],
          message: "Estado deve ter no mínimo 3 caracteres",
        });
      }
      if (data.address?.uf && data.address.uf.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "uf"],
          message: "UF deve ter no mínimo 2 caracteres",
        });
      }
      if (data.address?.country && data.address.country.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "country"],
          message: "País deve ter no mínimo 2 caracteres",
        });
      }
      if (data.address?.city && data.address.city.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "city"],
          message: "Cidade deve ter no mínimo 3 caracteres",
        });
      }
      if (data.address?.neighborhood && data.address.neighborhood.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "neighborhood"],
          message: "Bairro deve ter no mínimo 3 caracteres",
        });
      }
      if (data.address?.street && data.address.street.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "street"],
          message: "Rua deve ter no mínimo 3 caracteres",
        });
      }
      if (!data.categoryId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["categoryId"],
          message: "Categoria é obrigatória",
        });
      }
      if (!data.sessionId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["sessionId"],
          message: "Sessão é obrigatória",
        });
      }
    }

    if (!data.isBusiness) {
      if (!data.cpf) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cpf"],
          message: "CPF é obrigatório",
        });
      }
      if (data.cpf && data.cpf.length < 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cpf"],
          message: "CPF deve ter no mínimo 11 caracteres",
        });
      }
      if (data.age && data.age < 18) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["age"],
          message: "Idade deve ser maior que 18 anos",
        });
      }
    }
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
