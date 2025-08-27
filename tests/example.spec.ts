import { testEnv } from "./test-env";
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(testEnv.NEXT_PUBLIC_BETTER_AUTH_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/UIFoundry/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});
