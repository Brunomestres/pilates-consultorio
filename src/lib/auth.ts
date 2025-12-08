import { betterAuth } from "better-auth";
import { credentials } from "better-auth-credentials-plugin";
export const auth = betterAuth({
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
    enabled: false,
  },

  plugins: [
    credentials({
      path: "/sign-in/external",
      providerId: "external-api",
      callback(ctx, parsed) {
        console.log("Credentials plugin callback", { ctx, parsed });
        return null;
      },
    }),
  ],
});
