import { z } from "zod";

export const pacienteSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido").max(11, "Telefone inválido"),
  cpf_cnpj: z
    .string()
    .min(11, "CPF/CNPJ inválido")
    .max(14, "CPF/CNPJ inválido"),
  birth_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento inválida"),
  active: z.boolean().optional(),
});

export type PacienteFormData = z.infer<typeof pacienteSchema>;
