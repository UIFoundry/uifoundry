import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/UIFoundry/);
});

test("homepage loads successfully", async ({ page }) => {
  await page.goto("/");

  // Wait for the page to load completely
  await page.waitForLoadState("networkidle");

  // Check that the page is accessible and returns 200
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
});
