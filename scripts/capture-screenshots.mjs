import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projects.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, "../public/projects");

const viewport = { width: 1440, height: 900 };
const targetWidth = 1600;
// The layout stays at 1440x900 while the saved image is 1600x1000.
const deviceScaleFactor = targetWidth / viewport.width;

const cookieActionNames = /accept|allow|agree|got it|consent/i;
const cookieContainerSelector = [
  "#onetrust-banner-sdk",
  "#CybotCookiebotDialog",
  '[class*="cookie" i]',
  '[id*="cookie" i]',
  '[class*="consent" i]',
  '[id*="consent" i]',
  '[aria-label*="cookie" i]',
].join(", ");

const knownCookieSelectors = [
  "#onetrust-accept-btn-handler",
  "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll",
  "#ccc-notify-accept",
  ".cc-allow",
  ".cookie-accept",
  '[data-testid="cookie-policy-manage-dialog-accept-button"]',
];

// index.com.ng currently serves an expired certificate; capture-only exception.
const certificateExceptionHosts = new Set(["index.com.ng"]);

async function dismissCookieBanner(page) {
  for (const frame of page.frames()) {
    for (const selector of knownCookieSelectors) {
      const button = frame.locator(selector).first();
      if (await button.isVisible().catch(() => false)) {
        await button.click({ timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(500);
        return true;
      }
    }

    const containers = frame.locator(cookieContainerSelector);
    const containerCount = Math.min(await containers.count().catch(() => 0), 10);

    for (let i = 0; i < containerCount; i += 1) {
      const container = containers.nth(i);
      if (!(await container.isVisible().catch(() => false))) continue;

      const text = (await container.innerText().catch(() => "")).slice(0, 500);
      if (!/cookie|consent|gdpr/i.test(text)) continue;

      for (const role of ["button", "link"]) {
        const actions = container
          .getByRole(role)
          .filter({ hasText: cookieActionNames });
        const actionCount = Math.min(await actions.count().catch(() => 0), 10);

        for (let j = 0; j < actionCount; j += 1) {
          const action = actions.nth(j);
          if (await action.isVisible().catch(() => false)) {
            await action.click({ timeout: 3000 }).catch(() => {});
            await page.waitForTimeout(500);
            return true;
          }
        }
      }
    }
  }

  return false;
}

async function captureProject(page, project) {
  const filename = path.basename(project.image);
  const filePath = path.join(outputDir, filename);

  console.log(`Capturing ${project.title}: ${project.liveUrl}`);
  await page.goto(project.liveUrl, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2000);

  const dismissed = await dismissCookieBanner(page);
  if (dismissed) await page.waitForTimeout(500);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  await page.screenshot({
    path: filePath,
    type: "jpeg",
    quality: 85,
    fullPage: false,
  });

  console.log(
    `Saved ${path.relative(process.cwd(), filePath)}${
      dismissed ? " (cookie banner dismissed)" : ""
    }`
  );
}

async function main() {
  const liveProjects = projects.filter((project) => project.liveUrl);

  if (liveProjects.length === 0) {
    console.log("No projects with a live URL. Nothing to capture.");
    return;
  }

  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  let failures = 0;

  try {
    for (const project of liveProjects) {
      const hostname = new URL(project.liveUrl).hostname;
      const ignoreHTTPSErrors = certificateExceptionHosts.has(hostname);

      if (ignoreHTTPSErrors) {
        console.warn(
          `${project.title} has an invalid TLS certificate; certificate errors are skipped for this capture.`
        );
      }

      const context = await browser.newContext({
        viewport,
        deviceScaleFactor,
        locale: "en-US",
        ignoreHTTPSErrors,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      });
      const page = await context.newPage();

      try {
        await captureProject(page, project);
      } catch (error) {
        failures += 1;
        console.error(`Failed to capture ${project.title}: ${error.message}`);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  if (failures > 0) process.exitCode = 1;
}

await main();
