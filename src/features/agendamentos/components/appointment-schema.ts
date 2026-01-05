import { z } from "zod";

export const appointmentSchema = z.object({
  paciente: z.string().min(1, "Selecione o paciente"),
  data: z.string().min(1, "Data obrigatória"),
  hora: z.string().min(1, "Hora obrigatória"),
  duracao: z.string().min(1, "Duração obrigatória"),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
