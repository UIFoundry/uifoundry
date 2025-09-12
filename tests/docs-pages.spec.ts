import { test, expect } from "@playwright/test";

// Define docs pages manually based on the content structure
// This avoids MDX compilation issues during testing
const allDocsPages = [
  // Blocks
  {
    url: "/docs/blocks/header-blocks",
    title: "Header Blocks",
    description: "Collection of header block components",
  },
  {
    url: "/docs/blocks/header/header-1",
    title: "Header 1",
    description:
      "Responsive navigation header with animated mobile menu and scroll effects",
  },
  {
    url: "/docs/blocks/header/header-2",
    title: "Header 2",
    description: "Simple header with centered navigation and logo",
  },
  {
    url: "/docs/blocks/hero/hero-1",
    title: "Hero 1",
    description:
      "Primary hero block with alert, text animation, and call-to-action buttons",
  },

  // Fields
  {
    url: "/docs/fields/color-field",
    title: "Color Field",
    description: "Color picker field component for PayloadCMS",
  },
  {
    url: "/docs/fields/header-field",
    title: "Header Field",
    description: "Header text field with styling options",
  },
  {
    url: "/docs/fields/media-field",
    title: "Media Field",
    description: "Media upload field for images and files",
  },
  {
    url: "/docs/fields/subheader-field",
    title: "Subheader Field",
    description: "Subheader text field component",
  },
  {
    url: "/docs/fields/upload-field",
    title: "Upload Field",
    description: "File upload field component",
  },

  // Globals
  {
    url: "/docs/globals/header-global",
    title: "Header Global",
    description: "Global header configuration",
  },

  // Guides
  {
    url: "/docs/guides/registry-setup",
    title: "Registry Setup",
    description: "Guide for setting up the custom shadcn registry",
  },

  // Lib
  {
    url: "/docs/lib/field-types",
    title: "Field Types",
    description: "Common field type definitions and utilities",
  },
  {
    url: "/docs/lib/style-utils",
    title: "Style Utils",
    description: "Tailwind utility functions including cn() class merger",
  },

  // UI
  {
    url: "/docs/ui/animated-group",
    title: "Animated Group",
    description: "Animated group component with motion effects",
  },
  {
    url: "/docs/ui/button",
    title: "Button",
    description: "Button component with various styles and states",
  },
  {
    url: "/docs/ui/popover",
    title: "Popover",
    description: "Popover component for displaying content in overlay",
  },
  {
    url: "/docs/ui/renderblocks",
    title: "RenderBlocks",
    description: "Component for rendering PayloadCMS blocks",
  },
  {
    url: "/docs/ui/text-effect",
    title: "Text Effect",
    description: "Text animation and effect components",
  },
];

test.describe("Documentation Pages", () => {
  test.beforeEach(async () => {
    // Set longer timeout for docs pages that might have heavy components
    test.setTimeout(30000);
  });

  test("should have docs pages available", () => {
    expect(allDocsPages.length).toBeGreaterThan(0);
    console.log(`Found ${allDocsPages.length} docs pages to test`);
  });

  test("docs index should load", async ({ page }) => {
    await page.goto("/docs");
    await expect(page).toHaveTitle(/UIFoundry/);

    // Should either show docs index or redirect to first page
    await expect(page.locator("body")).toBeVisible();

    // Check that we're not on a 404 page
    await expect(page.locator('text="404"')).not.toBeVisible();
    await expect(page.locator('text="Page not found"')).not.toBeVisible();
  });

  // Test all individual docs pages
  for (const docPage of allDocsPages) {
    test(`should load docs page: ${docPage.url}`, async ({ page }) => {
      await page.goto(docPage.url);

      // Wait for page to load
      await page.waitForLoadState("networkidle");

      // Check that page loads without 404
      await expect(page.locator('text="404"')).not.toBeVisible();
      await expect(page.locator('text="Page not found"')).not.toBeVisible();

      // Check that the page has the expected title
      if (docPage.title) {
        await expect(page.locator("h1")).toContainText(docPage.title);
      }

      // Check that navigation elements are present
      await expect(page.locator("nav")).toBeVisible();

      // Check that page content is present
      await expect(page.locator("main")).toBeVisible();
    });
  }

  test("docs navigation should work", async ({ page }) => {
    await page.goto("/docs");

    // Wait for navigation to load
    await page.waitForLoadState("networkidle");

    // Find and click on first navigation link
    const navLinks = page.locator("nav a[href^='/docs/']");
    const firstLink = navLinks.first();

    if ((await firstLink.count()) > 0) {
      const href = await firstLink.getAttribute("href");
      await firstLink.click();

      // Verify navigation worked
      await page.waitForURL(href!);
      await expect(page.locator('text="404"')).not.toBeVisible();
    }
  });

  test("docs search functionality should work", async ({ page }) => {
    await page.goto("/docs");

    // Look for search input/button
    const searchInput = page.locator(
      'input[type="search"], input[placeholder*="search" i]',
    );
    const searchButton = page.locator(
      'button[aria-label*="search" i], button:has-text("Search")',
    );

    if ((await searchInput.count()) > 0) {
      await searchInput.fill("header");
      // Wait for search results or suggestions
      await page.waitForTimeout(1000);
    } else if ((await searchButton.count()) > 0) {
      await searchButton.click();
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
