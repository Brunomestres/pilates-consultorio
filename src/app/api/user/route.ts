import { db } from "@/config/db/drizzle";
import { users } from "@/db/schema/users";
import { hashPassword } from "@/utils/hash-password";
import { NextRequest } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
  phone: z.string(),
  cpf_cnpj: z.string(),
  studio_id: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("User route body:", body);
  const parsedBody = userSchema.safeParse(body);
  if (!parsedBody.success) {
    return Response.json(
      { message: "Invalid request data", errors: parsedBody.error.format() },
      { status: 400 }
    );
  }
  const passwordHashed = await hashPassword(parsedBody.data.password);
  const data = await db.insert(users).values({
    email: parsedBody.data.email,
    name: parsedBody.data.name,
    password: passwordHashed,
    phone: parsedBody.data.phone,
    cpf_cnpj: parsedBody.data.cpf_cnpj,
    studio_id: parsedBody.data.studio_id,
  });

  return Response.json({
    message: "User route received data",
    data,
  });
}
