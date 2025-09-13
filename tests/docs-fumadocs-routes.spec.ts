import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

// Validate all docs routes defined via Fumadocs meta.json files
// Runs in parallel with retries to reduce flakes in CI

test.describe.configure({ mode: "parallel", retries: 2, timeout: 60000 });

interface MetaFile {
  title?: string;
  description?: string;
  pages?: string[];
}

function readJsonFile<T = unknown>(filePath: string): T | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function exists(p: string): boolean {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function isDir(p: string): boolean {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

// Recursively collect docs routes based on meta.json structure
function collectRoutesFromMeta(dir: string, routeBase: string): string[] {
  const routes: string[] = [];
  const metaPath = path.join(dir, "meta.json");
  const meta = readJsonFile<MetaFile>(metaPath);

  if (!meta || !Array.isArray(meta.pages)) {
    // Fallback: include any direct MDX files in this folder
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        const name = entry.name.replace(/\.mdx$/, "");
        if (name === "index") {
          routes.push(routeBase);
        } else {
          routes.push(`${routeBase}/${name}`);
        }
      }
      if (entry.isDirectory()) {
        const subdir = path.join(dir, entry.name);
        const subBase = `${routeBase}/${entry.name}`;
        routes.push(...collectRoutesFromMeta(subdir, subBase));
      }
    }
    return Array.from(new Set(routes));
  }

  for (const p of meta.pages) {
    const subDir = path.join(dir, p);
    const filePath = path.join(dir, `${p}.mdx`);

    if (isDir(subDir)) {
      // Add directory index if present
      const idx = path.join(subDir, "index.mdx");
      if (exists(idx)) routes.push(`${routeBase}/${p}`);
      // Recurse into nested meta
      routes.push(...collectRoutesFromMeta(subDir, `${routeBase}/${p}`));
    } else if (exists(filePath)) {
      routes.push(`${routeBase}/${p}`);
    } else if (p === "index") {
      // Allow index to reference the dir itself
      routes.push(routeBase);
    } else {
      // Not found on disk — log for diagnostics, but do not fail collection
      // This helps catch meta.json drift during test output
      // eslint-disable-next-line no-console
      console.warn(`Meta entry without file/dir: ${routeBase}/${p}`);
    }
  }

  return Array.from(new Set(routes));
}

// Build list of Fumadocs-defined routes
const docsRoot = path.join(process.cwd(), "content", "docs");
const definedDocsRoutes = collectRoutesFromMeta(docsRoot, "/docs");

// Ensure we always include the docs root
if (!definedDocsRoutes.includes("/docs")) definedDocsRoutes.unshift("/docs");

// Basic sanity check
test("fumadocs meta should define at least one route", () => {
  expect(definedDocsRoutes.length).toBeGreaterThan(0);
});

// Main test suite

test.describe("Fumadocs-defined routes", () => {
  for (const url of definedDocsRoutes) {
    test(`loads ${url}`, async ({ page }) => {
      // Navigate with retries for flakiness
      let loaded = false;
      for (let i = 0; i < 2 && !loaded; i++) {
        try {
          const res = await page.goto(url, {
            waitUntil: "networkidle",
            timeout: 30000,
          });
          if (res && res.status() >= 400)
            throw new Error(`HTTP ${res.status()}`);
          loaded = true;
        } catch (e) {
          if (i === 1) throw e;
          await page.waitForTimeout(1500);
        }
      }

      // Basic assertions
      await expect(page.locator('text="404"')).not.toBeVisible();
      await expect(page.locator('text="Page not found"')).not.toBeVisible();
      await expect(
        page.locator("main, article, .docs-content, #__next"),
      ).toBeVisible();

      // Ensure there's some visible heading/content
      const hasH1 = await page
        .locator("h1")
        .first()
        .isVisible()
        .catch(() => false);
      const hasH2 = await page
        .locator("h2")
        .first()
        .isVisible()
        .catch(() => false);
      expect(hasH1 || hasH2).toBeTruthy();
    });
  }
});
