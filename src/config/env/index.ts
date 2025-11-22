import { loadEnvConfig } from "@next/env";

import { z } from "zod";

const projectDir = process.cwd();

loadEnvConfig(projectDir);

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

const envParsed = envSchema.safeParse(process.env);

if (envParsed.error) {
  console.error("❌ Invalid environment variables:", envParsed.error.format());
  throw new Error("Invalid environment variables");
}

const env = envParsed.data;

export { env };
