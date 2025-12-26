"use server";
import { db } from "@/config/db/drizzle";
import { clients } from "@/db/schema";
import { appointments } from "@/db/schema/appointment";
import { appointments_status } from "@/db/schema/appointment-status";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getResumeAppoimntments() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  try {
    const res = await db
      .select({ id: appointments.id })
      .from(appointments)
      .where(eq(appointments.studio_id, session!.user.studio_id));
    console.log("Resume appointments:", res);
    return res;
  } catch (error) {
    console.log("Error fetching resume appointments:", error);
    throw error;
  }
}

export async function getStatus() {
  const status = await db.select().from(appointments_status);

  return status;
}

export async function getPacientes() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const pacientes = await db
    .select()
    .from(clients)
    .where(
      and(
        eq(clients.studio_id, session!.user.studio_id),
        eq(clients.active, true)
      )
    );

  return pacientes;
}
