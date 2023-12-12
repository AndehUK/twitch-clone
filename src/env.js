import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .startsWith("mysql://")
      .refine(
        (str) => !str.includes("mysql://username:password@host:port/database"),
        "You forgot to change the default URL",
      ),
    CLERK_SECRET_KEY: z.string().startsWith("sk_test_"),
    CLERK_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
      .string()
      .startsWith("pk_test_")
      .refine(
        (str) => !str.endsWith("pk_test_"),
        "You forgot to change the default NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
      ),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z
      .string()
      .refine(
        (str) => str === "/login",
        "The NEXT_PUBLIC_CLERK_SIGN_IN_URL must be '/login'!",
      ),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z
      .string()
      .refine(
        (str) => str === "/register",
        "The NEXT_PUBLIC_CLERK_SIGN_UP_URL must be '/register'!",
      ),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z
      .string()
      .refine(
        (str) => str === "/",
        "The NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL must be '/'!",
      ),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z
      .string()
      .refine(
        (str) => str === "/",
        "The NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL must be '/'!",
      ),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
