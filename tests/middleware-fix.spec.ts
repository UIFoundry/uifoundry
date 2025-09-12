import { test, expect } from "@playwright/test";

test.describe("Docs Middleware Fix", () => {
  test("docs routes should bypass auth middleware", async ({ page }) => {
    const baseUrl =
      process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3001";

    // Test that docs index loads without auth - prevents regression of the specific issue we fixed
    const docsResponse = await page.goto(`${baseUrl}/docs`);
    expect(docsResponse?.status()).toBeLessThan(400);

    // Verify we're not redirected to homepage (the core issue we fixed)
    expect(page.url()).toContain("/docs");

    // Ensure the page actually loads content
    await expect(page.locator("body")).toBeVisible();
    const title = await page.title();
    expect(title).not.toBe("404: This page could not be found.");
  });
});
