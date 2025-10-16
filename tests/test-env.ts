import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Test environment configuration
 * Loads environment variables for testing without validation
 */
function loadTestEnv() {
  // Skip env validation for tests
  process.env.SKIP_ENV_VALIDATION = "true";

  try {
    const envFile = readFileSync(resolve(process.cwd(), ".env"), "utf8");
    const envVars = envFile
      .split("\n")
      .filter((line) => line.trim() && !line.trim().startsWith("#"))
      .reduce(
        (acc, line) => {
          const [key, ...values] = line.split("=");
          if (key && values.length > 0) {
            const value = values.join("=").replace(/^["']|["']$/g, "");
            acc[key.trim()] = value;
          }
          return acc;
        },
        {} as Record<string, string>,
      );

    // Merge with existing process.env
    Object.assign(process.env, envVars);

    return {
      NEXT_PUBLIC_BETTER_AUTH_URL:
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3001",
      DATABASE_URI: process.env.DATABASE_URI ?? "",
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ?? "",
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ?? "",
      NODE_ENV: process.env.NODE_ENV ?? "test",
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
      S3_BUCKET: process.env.S3_BUCKET ?? "",
      S3_REGION: process.env.S3_REGION ?? "",
      S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID ?? "",
      S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY ?? "",
    };
  } catch (error) {
    console.warn("Could not load .env file for tests:", error);
    return {
      NEXT_PUBLIC_BETTER_AUTH_URL: "http://localhost:3001",
      DATABASE_URI: "",
      PAYLOAD_SECRET: "",
      BETTER_AUTH_SECRET: "",
      NODE_ENV: "test",
      GOOGLE_CLIENT_ID: "",
      GOOGLE_CLIENT_SECRET: "",
      S3_BUCKET: "",
      S3_REGION: "",
      S3_ACCESS_KEY_ID: "",
      S3_SECRET_ACCESS_KEY: "",
    };
  }
}

export const testEnv = loadTestEnv();
