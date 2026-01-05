"use server";
import { db } from "@/config/db/drizzle";
import { clients } from "@/db/schema";
import { appointments } from "@/db/schema/appointment";
import { appointments_status } from "@/db/schema/appointment-status";
import { AppointmentFormData } from "@/features/agendamentos/components/appointment-schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { parseISO, setHours, setMinutes, setSeconds } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export async function getResumeAppoimntments() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  try {
    const res = await db
      .select({
        id: appointments.id,
        date: appointments.date,
        hour: appointments.hour,
        client_name: clients.name,
      })
      .from(appointments)
      .leftJoin(clients, eq(appointments.client_id, clients.id))
      .where(eq(appointments.studio_id, session!.user.studio_id));
    console.log("Fetched resume appointments:", res);
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

export async function createAppointment(data: AppointmentFormData) {
  console.log("Creating appointment with data:", data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [hour, minute] = data.hora.split(":").map(Number);

  let dateTime = parseISO(data.data);
  dateTime = setHours(dateTime, hour);
  dateTime = setMinutes(dateTime, minute);
  dateTime = setSeconds(dateTime, 0);

  const formattedDateTime = formatInTimeZone(
    dateTime,
    "America/Sao_Paulo",
    "yyyy-MM-dd'T'HH:mm:ssXXX"
  );

  const newAppointment = await db.insert(appointments).values({
    client_id: data.paciente,
    studio_id: session!.user.studio_id,
    date: data.data,
    hour: formattedDateTime,
    duration_minutes: data.duracao,
    status: "1cb5e2de-4a1a-46b3-ac4e-19c708d2f873",
    created_by_user_id: session!.user.id,
  });

  return newAppointment;
}
