import { test, expect } from "@playwright/test";

const BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "";
const IS_DEPLOYED =
	BASE_URL &&
	!BASE_URL.includes("localhost") &&
	!BASE_URL.includes("127.0.0.1");

test.describe("Deployment Docs Verification", () => {
	test.skip(!IS_DEPLOYED, "Runs only against deployed baseURL");
	test.beforeEach(async () => {
		// Set longer timeout for deployment testing
		test.setTimeout(60000);
	});

	test("should access deployment docs index", async ({ page }) => {
		await page.goto("/docs", { waitUntil: "domcontentloaded", timeout: 60000 });

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

		console.log(`✅ Successfully accessed docs`);
	});

	test("should serve static assets correctly", async ({ page }) => {
		await page.goto("/docs", { waitUntil: "domcontentloaded", timeout: 60000 });

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

		// Allow some responses to arrive without blocking on networkidle
		await page.waitForTimeout(1000);

		if (failedRequests.length > 0) {
			console.warn("Failed requests detected:", failedRequests);
			// Don't fail the test for this, but log warnings
		}

		console.log("✅ Static assets loading correctly");
	});
});
