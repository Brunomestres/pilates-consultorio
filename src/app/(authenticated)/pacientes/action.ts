"use server";

import { db } from "@/config/db/drizzle";
import { clients } from "@/db/schema";
import { PacienteFormData } from "@/features/paciente/components/paciente-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.studio_id) {
    throw new Error("Sessão inválida");
  }

  const paciente = await db.insert(clients).values({
    studio_id: session.user.studio_id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    cpf_cnpj: data.cpf_cnpj,
    birth_date: data.birth_date,
    active: data.active ?? true,
  });

  revalidatePath("/pacientes");
  return paciente;
}

export async function updatePaciente(id: string, data: PacienteFormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.studio_id) {
    throw new Error("Sessão inválida");
  }
  try {
    const paciente = await db
      .update(clients)
      .set({
        name: data.name,
        email: data.email,
        phone: data.phone,
        cpf_cnpj: data.cpf_cnpj,
        birth_date: data.birth_date,
        active: data.active ?? true,
      })
      .where(eq(clients.id, id));

    revalidatePath("/pacientes");
    return paciente;
  } catch (error) {
    console.error("Error updating paciente:", error);
    throw new Error("Erro ao atualizar o paciente");
  }
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
