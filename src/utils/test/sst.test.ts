import { describe, it, expect } from "vitest";
import { getEnvVar } from "~/utils/sst";

describe("SST Utils", () => {
  it("should return environment variable value", () => {
    const value = getEnvVar("NEXT_PUBLIC_BETTER_AUTH_URL");
    expect(value).toBeDefined();
    expect(typeof value).toBe("string");
  });

  it("should handle missing environment variables gracefully", () => {
    // Test that the function doesn't throw even if SST Resource is not available
    expect(() => {
      getEnvVar("DATABASE_URI");
    }).not.toThrow();
  });
});
