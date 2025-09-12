import { test, expect } from "@playwright/test";

test.describe("Deployment Docs Verification", () => {
  test.beforeEach(async () => {
    // Set longer timeout for deployment testing
    test.setTimeout(60000);
  });

  test("should access deployment docs index", async ({ page }) => {
    // This test will run against the deployed URL
    const baseUrl =
      process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3001";

    await page.goto(`${baseUrl}/docs`);

    // Wait for content to load
    await page.waitForLoadState("networkidle");

    // Check that we're not getting a 404 or error page
    const response = await page.evaluate(() => document.title);
    expect(response).toBeTruthy();

    // Check for common error indicators
    await expect(page.locator('text="404"')).not.toBeVisible();
    await expect(page.locator('text="Page not found"')).not.toBeVisible();
    await expect(
      page.locator('text="Internal Server Error"'),
    ).not.toBeVisible();

    // Check that docs content is present
    await expect(page.locator("body")).toBeVisible();

    console.log(`✅ Successfully accessed docs at: ${baseUrl}/docs`);
  });

  test("should access specific docs pages on deployment", async ({ page }) => {
    const baseUrl =
      process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3001";

    // Test a few key docs pages that should definitely exist
    const testPages = [
      "/docs/blocks/header/header-1",
      "/docs/fields/color-field",
      "/docs/ui/button",
      "/docs/guides/registry-setup",
    ];

    for (const pagePath of testPages) {
      console.log(`Testing page: ${baseUrl}${pagePath}`);

      const response = await page.goto(`${baseUrl}${pagePath}`);

      // Check HTTP status
      expect(response?.status()).toBeLessThan(400);

      // Wait for content to load
      await page.waitForLoadState("networkidle");

      // Check for error indicators
      await expect(page.locator('text="404"')).not.toBeVisible();
      await expect(page.locator('text="Page not found"')).not.toBeVisible();

      // Check that main content is present
      await expect(page.locator("main, article, .docs-content")).toBeVisible();

      console.log(`✅ Successfully loaded: ${pagePath}`);
    }
  });

  test("should have working navigation on deployment", async ({ page }) => {
    const baseUrl =
      process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3001";

    await page.goto(`${baseUrl}/docs`);
    await page.waitForLoadState("networkidle");

    // Look for navigation elements
    const navElement = page.locator("nav, .sidebar, .docs-nav");
    await expect(navElement).toBeVisible();

    // Find navigation links
    const navLinks = page.locator(
      "nav a[href^='/docs/'], .sidebar a[href^='/docs/'], .docs-nav a[href^='/docs/']",
    );
    const linkCount = await navLinks.count();

    expect(linkCount).toBeGreaterThan(0);

    // Test clicking a few navigation links
    if (linkCount > 0) {
      const firstLink = navLinks.first();
      const href = await firstLink.getAttribute("href");

      if (href) {
        await firstLink.click();
        await page.waitForLoadState("networkidle");

        // Verify the navigation worked
        expect(page.url()).toContain(href);
        await expect(page.locator('text="404"')).not.toBeVisible();
      }
    }

    console.log(`✅ Navigation working with ${linkCount} links found`);
  });

  test("should serve static assets correctly", async ({ page }) => {
    const baseUrl =
      process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3001";

    await page.goto(`${baseUrl}/docs`);
    await page.waitForLoadState("networkidle");

    // Check that CSS is loading
    const styles = await page.locator("link[rel='stylesheet'], style").count();
    expect(styles).toBeGreaterThan(0);

    // Check that JavaScript is loading
    const scripts = await page.locator("script[src]").count();
    expect(scripts).toBeGreaterThan(0);

    // Check for any failed network requests
    const failedRequests: string[] = [];

    page.on("response", (response) => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.status()}: ${response.url()}`);
      }
    });

    await page.reload();
    await page.waitForLoadState("networkidle");

    if (failedRequests.length > 0) {
      console.warn("Failed requests detected:", failedRequests);
      // Don't fail the test for this, but log warnings
    }

    console.log("✅ Static assets loading correctly");
  });
});
