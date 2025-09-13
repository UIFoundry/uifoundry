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
    await page.goto("/docs", { waitUntil: "domcontentloaded", timeout: 30000 });

    await expect(page).toHaveTitle(/UIFoundry/);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator('text="404"')).not.toBeVisible();
    await expect(page.locator('text="Page not found"')).not.toBeVisible();
  });

  // Test all individual docs pages
  for (const docPage of allDocsPages) {
    test(`should load docs page: ${docPage.url}`, async ({ page }) => {
      await page.goto(docPage.url, {
        waitUntil: "domcontentloaded",
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
});

// Export the docs pages for use in other tests
export { allDocsPages };
