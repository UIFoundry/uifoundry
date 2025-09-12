import { test } from "@playwright/test";

test.describe("Docs Deployment Diagnostic", () => {
  test.beforeEach(async () => {
    test.setTimeout(60000);
  });

  test("diagnose docs routing issues", async ({ page }) => {
    const baseUrl =
      process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3001";

    console.log(`🔍 Testing docs routing on: ${baseUrl}`);

    // Test basic connectivity
    try {
      const response = await page.goto(`${baseUrl}`);
      console.log(`✅ Base URL accessible: ${response?.status()}`);
    } catch (error) {
      console.log(`❌ Base URL error:`, error);
      test.fail();
    }

    // Test docs index
    try {
      const response = await page.goto(`${baseUrl}/docs`);
      console.log(`📝 Docs index response: ${response?.status()}`);

      if (response?.status() === 404) {
        console.log(`❌ Docs index returns 404 - routing issue detected`);

        // Check if it's a client-side routing issue
        await page.waitForTimeout(2000);
        const currentUrl = page.url();
        const pageTitle = await page.title();
        const bodyText = await page.locator("body").textContent();

        console.log(`Current URL: ${currentUrl}`);
        console.log(`Page title: ${pageTitle}`);
        console.log(`Body contains "404": ${bodyText?.includes("404")}`);
        console.log(
          `Body contains "Not Found": ${bodyText?.includes("Not Found")}`,
        );
      } else {
        console.log(`✅ Docs index loaded successfully`);
      }
    } catch (error) {
      console.log(`❌ Docs index error:`, error);
    }

    // Test specific docs pages
    const testPages = [
      "/docs/blocks/header/header-1",
      "/docs/fields/color-field",
      "/docs/ui/button",
    ];

    for (const pagePath of testPages) {
      try {
        const response = await page.goto(`${baseUrl}${pagePath}`);
        console.log(`📄 ${pagePath}: ${response?.status()}`);

        if (response?.status() === 404) {
          // Additional diagnostic info
          const pageContent = await page.content();
          const hasNextJsError = pageContent.includes(
            "This page could not be found",
          );
          const hasCustom404 =
            pageContent.includes("404") || pageContent.includes("Not Found");

          console.log(`  - Next.js 404 page: ${hasNextJsError}`);
          console.log(`  - Custom 404 content: ${hasCustom404}`);
        }
      } catch (error) {
        console.log(`❌ ${pagePath} error:`, error);
      }
    }

    // Check for static file serving issues
    try {
      // Test CSS loading
      const response = await page.goto(
        `${baseUrl}/_next/static/css/app/layout.css`,
        {
          waitUntil: "domcontentloaded",
        },
      );
      console.log(
        `🎨 CSS files loading: ${response?.status() || "timeout/error"}`,
      );
    } catch (error) {
      console.log(`⚠️  Static file serving might have issues`);
    }

    // Test API endpoints
    try {
      const response = await page.goto(`${baseUrl}/api/version`);
      console.log(`🔧 API endpoint accessible: ${response?.status()}`);
    } catch (error) {
      console.log(`❌ API endpoint error:`, error);
    }

    // Environment info
    console.log(`🌍 Environment details:`);
    console.log(`  - Base URL: ${baseUrl}`);
    console.log(
      `  - User Agent: ${await page.evaluate(() => navigator.userAgent)}`,
    );
    console.log(`  - Current URL: ${page.url()}`);
  });

  test("check SST deployment specifics", async ({ page }) => {
    const baseUrl =
      process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3001";

    if (!baseUrl.includes("uifoundry.dev")) {
      console.log("⏭️  Skipping SST-specific tests (not on deployment URL)");
      test.skip();
    }

    console.log(`🚀 Testing SST deployment specifics`);

    // Check deployment headers and routing
    const response = await page.goto(baseUrl);
    const headers = response?.headers();

    console.log(`📋 Response headers:`);
    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        if (
          key.startsWith("x-") ||
          key.includes("cloudfront") ||
          key.includes("cache")
        ) {
          console.log(`  - ${key}: ${value}`);
        }
      }
    }

    // Test CloudFront behavior
    await page.goto(`${baseUrl}/docs/blocks/header/header-1`);
    const pageResponse = await page.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      hasContent: document.body.children.length > 0,
    }));

    console.log(`📊 Page evaluation result:`, pageResponse);
  });
});
