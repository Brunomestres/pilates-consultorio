"use server";

import { db } from "@/config/db/drizzle";
import { SignupFormValues } from "./schema";
import { users } from "@/db/schema/users";
import { studios } from "@/db/schema/studios";

export async function registerUser(data: SignupFormValues) {
  try {
    const studioCreated = await db
      .insert(studios)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone,
        active: true,
      })
      .returning({ id: studios.studio_id });
    await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      studio_id: studioCreated[0].id,
      active: true,
      birth_date: data.birth_date,
      cpf_cnpj: data.cpf_cnpj,
    });
    return "User registered successfully";
  } catch (error) {
    console.log(error);
  }
}
