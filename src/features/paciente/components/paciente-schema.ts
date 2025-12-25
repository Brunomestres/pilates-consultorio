import { z } from "zod";

export const pacienteSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .max(11, "Telefone inválido")
    .optional()
    .or(z.literal("")),
  cpf_cnpj: z
    .string()
    .min(11, "CPF/CNPJ inválido")
    .max(14, "CPF/CNPJ inválido")
    .optional()
    .or(z.literal("")),
  birth_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento inválida")
    .optional()
    .or(z.literal("")),
  active: z.boolean().optional().default(true),
});

export type PacienteFormData = z.infer<typeof pacienteSchema>;
