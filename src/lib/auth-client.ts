import { createAuthClient } from "better-auth/react";
import {
  credentialsClient,
  defaultCredentialsSchema,
} from "better-auth-credentials-plugin/client";
import { User } from "better-auth";
import { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    credentialsClient<
      User,
      "/sign-in/external",
      typeof defaultCredentialsSchema
    >(),
    inferAdditionalFields<typeof auth>(),
  ],
});
