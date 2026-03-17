import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

import { authEnv } from "@acme/auth/env";

export const env = createEnv({
  extends: [authEnv()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  server: {
    POSTGRES_URL: z.url(),
    APP_URL: z.url().optional(),
  },
  clientPrefix: "PUBLIC_",
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_URL: process.env.POSTGRES_URL,
    APP_URL: process.env.APP_URL,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
