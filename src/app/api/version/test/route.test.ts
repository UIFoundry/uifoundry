import { describe, it, expect, beforeEach } from "vitest";
import { GET } from "../route";

describe("/api/version endpoint", () => {
  beforeEach(() => {
    // Clean up environment variables
    delete process.env.COMMIT_SHA;
    delete process.env.BUILD_TIME;
    delete process.env.SST_STAGE;
  });

  it("should return version information", async () => {
    const response = await GET();
    const data = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("commitSha");
    expect(data).toHaveProperty("buildTime");
    expect(data).toHaveProperty("stage");
    expect(data).toHaveProperty("version");
    expect(data).toHaveProperty("timestamp");
  });

  it("should return default values when env vars are missing", async () => {
    const response = await GET();
    const data = (await response.json()) as {
      commitSha: string;
      stage: string;
      version: string;
    };

    expect(data.commitSha).toBe("unknown");
    expect(data.stage).toBe("local");
    expect(data.version).toBe("1.0.0");
  });

  it("should use environment variables when available", async () => {
    process.env.COMMIT_SHA = "abc123";
    process.env.BUILD_TIME = "2023-01-01T00:00:00.000Z";
    process.env.SST_STAGE = "test";

    const response = await GET();
    const data = (await response.json()) as {
      commitSha: string;
      buildTime: string;
      stage: string;
    };

    expect(data.commitSha).toBe("abc123");
    expect(data.buildTime).toBe("2023-01-01T00:00:00.000Z");
    expect(data.stage).toBe("test");
  });
});
