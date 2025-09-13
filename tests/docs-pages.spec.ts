import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

// Add retry and timeout configuration for flaky server
test.describe.configure({ mode: "parallel", retries: 2, timeout: 60000 });

// Helper function to discover docs pages from file system
function discoverDocsPages(): Array<{ url: string; title: string }> {
  const docsPath = path.join(process.cwd(), "content", "docs");
  const pages: Array<{ url: string; title: string }> = [];

  // Always include the docs index
  pages.push({ url: "/docs", title: "UIFoundry Documentation" });

  function scanDirectory(dir: string, urlPath: string = "/docs") {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          scanDirectory(path.join(dir, entry.name), `${urlPath}/${entry.name}`);
        } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
          // Convert file path to URL
          const fileName = entry.name.replace(".mdx", "");

          // Skip index.mdx files as they're handled by directory structure
          if (fileName === "index") {
            continue;
          }

          const pageUrl = `${urlPath}/${fileName}`;

          // Generate a title from the file name
          const title = fileName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          pages.push({ url: pageUrl, title });
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory ${dir}:`, error);
    }
  }

  // Start scanning from the docs directory
  scanDirectory(docsPath);

  return pages;
}

// Discover all docs pages at runtime
const allDocsPages = discoverDocsPages();

test.describe("Documentation Pages", () => {
  test.beforeEach(async () => {
    // Set longer timeout for docs pages that might have heavy components
    test.setTimeout(30000);
  });

  test("should have docs pages available", () => {
    expect(allDocsPages.length).toBeGreaterThan(0);
  });

  test("docs index should load", async ({ page }) => {
    await page.goto("/docs", { waitUntil: "networkidle", timeout: 30000 });

    await expect(page).toHaveTitle(/UIFoundry/);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator('text="404"')).not.toBeVisible();
    await expect(page.locator('text="Page not found"')).not.toBeVisible();
  });

  // Test all individual docs pages
  for (const docPage of allDocsPages) {
    test(`should load docs page: ${docPage.url}`, async ({ page }) => {
      await page.goto(docPage.url, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      await expect(page.locator('text="404"')).not.toBeVisible();
      await expect(page.locator('text="Page not found"')).not.toBeVisible();
      await expect(
        page.locator('text="Internal Server Error"'),
      ).not.toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("body")).toBeVisible();
    });
  }

  test.skip("docs navigation should work", async ({ page }) => {
    await page.goto("/docs");

    // Wait for navigation to load
    await page.waitForLoadState("networkidle");

    // Find and click on first navigation link
    const navLinks = page.locator("a[href^='/docs/']:visible");
    const firstLink = navLinks.first();

    if ((await firstLink.count()) > 0) {
      const href = await firstLink.getAttribute("href");
      await firstLink.click();

      // Verify navigation worked
      await page.waitForURL(href!);
      await expect(page.locator('text="404"')).not.toBeVisible();
    }
  });

  test.skip("docs search functionality should work", async ({ page }) => {
    await page.goto("/docs");

    // Look for search input/button
    const searchInput = page.locator(
      'input[type="search"], input[placeholder*="search" i]',
    );
    const searchButton = page.locator(
      'button[aria-label*="search" i]:visible, button:has-text("Search"):visible',
    );

    if ((await searchInput.count()) > 0) {
      await searchInput.fill("header");
      // Wait for search results or suggestions
      await page.waitForTimeout(1000);
    } else if ((await searchButton.count()) > 0) {
      await searchButton.first().click();
      // Test search modal/overlay opens
      await expect(
        page.locator('[role="dialog"], .search-modal, [data-testid="search"]'),
      ).toBeVisible();
    }
  });

  test("docs pages should have proper meta tags", async ({ page }) => {
    // Test a few key pages for SEO meta tags
    const testPages = allDocsPages.slice(0, 3);

    for (const docPage of testPages) {
      await page.goto(docPage.url);

      // Check title tag
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);

      // Check meta description if present
      const metaDescription = page.locator('meta[name="description"]');
      if ((await metaDescription.count()) > 0) {
        const description = await metaDescription.getAttribute("content");
        expect(description).toBeTruthy();
      }
    }
  });

  test("docs pages should be responsive", async ({ page }) => {
    // Test a sample page on different viewport sizes
    if (allDocsPages.length === 0) {
      test.skip();
      return;
    }

    const samplePage = allDocsPages[0]!;

    // Desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto(samplePage.url);
    await expect(page.locator("main")).toBeVisible();

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(page.locator("main")).toBeVisible();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(page.locator("main")).toBeVisible();
  });
});

// Export the docs pages for use in other tests
export { allDocsPages };
