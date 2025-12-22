import { account, session, user } from "@/db/schema";
import { db } from "../config/db/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user: user, account: account, session: session },
  }),
  user: {
    additionalFields: {
      studio_id: {
        type: "string",
        required: true,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      strategy: "jwe", // can be "jwt" or "compact"
      refreshCache: true, // Enable stateless refresh
    },
  },
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
  },
  emailAndPassword: {
    enabled: true,
  },

  plugins: [],
});
