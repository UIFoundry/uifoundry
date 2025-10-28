import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/UIFoundry/);
});

test("homepage loads successfully", async ({ page }) => {
  const response = await page.goto("/", {
    timeout: 30000,
    waitUntil: "domcontentloaded",
  });

  // Page should load and not error
  expect(response?.status()).toBeLessThan(400);
  await expect(page.locator("body")).toBeVisible();
});
