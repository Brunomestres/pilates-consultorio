"use server";

import { db } from "@/config/db/drizzle";
import { SignupFormValues } from "./schema";
import { users } from "@/db/schema/users";
import { studios } from "@/db/schema/studios";
import { hashPassword } from "@/utils/hash-password";

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

    const hashedPassword = await hashPassword(data.password);
    await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      studio_id: studioCreated[0].id,
      active: true,
      cpf_cnpj: data.cpf_cnpj,
    });
    return "User registered successfully";
  } catch (error) {
    console.log(error);
  }
}
