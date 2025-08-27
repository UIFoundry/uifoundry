import { beforeAll, beforeEach, vi } from "vitest";

// Mock SST Resource for unit tests
beforeAll(() => {
  // Mock the SST Resource object
  vi.mock("sst", () => ({
    Resource: {
      DATABASE_URI: { value: "mongodb://test-db" },
      NEXT_PUBLIC_BETTER_AUTH_URL: { value: "http://localhost:3001" },
      BETTER_AUTH_SECRET: { value: "test-secret" },
      PAYLOAD_SECRET: { value: "test-payload-secret" },
    },
  }));
});

// Clean up mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});
