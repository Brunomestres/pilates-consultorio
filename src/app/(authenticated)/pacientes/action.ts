"use server";

import { db } from "@/config/db/drizzle";
import { clients } from "@/db/schema";
import { PacienteFormData } from "@/features/paciente/components/paciente-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export type Pacientes = {
  id: string;
  studio_id: string;
  name: string;
  email: string;
  phone: string;
  cpf_cnpj: string | null;
  birth_date: string | null;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

export async function createPaciente(data: PacienteFormData) {
  console.log("Creating paciente with data:", data);
}

export async function getPacientes(): Promise<Pacientes[]> {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const pacientes = await db
      .select()
      .from(clients)
      .where(eq(clients.studio_id, data?.user.studio_id ?? ""));

    return pacientes;
  } catch (error) {
    console.error("Error fetching pacientes:", error);
    return [];
  }
}
