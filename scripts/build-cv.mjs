/*
 * Builds public/Great-Onyenokwe-CV.pdf from scripts/cv/cv.html.
 *
 *   npm run build:cv
 *
 * Uses the Playwright devDependency. If Playwright's browser is not installed,
 * run `npx playwright install chromium`, or point CV_CHROMIUM_PATH at an
 * existing Chromium binary.
 */
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(__dirname, "cv/cv.html");
const stylesheet = path.resolve(__dirname, "cv/cv.css");
const output = path.resolve(__dirname, "../public/Great-Onyenokwe-CV.pdf");
const EXPECTED_PAGES = 1;

// Writing rule for the CV: no em dashes or en dashes.
for (const file of [source, stylesheet]) {
  const text = await readFile(file, "utf8");
  const match = text.match(/[\u2013\u2014]/);
  if (match) {
    const line = text.slice(0, match.index).split("\n").length;
    throw new Error(`${path.relative(process.cwd(), file)}:${line} contains an em or en dash.`);
  }
}

const launchOptions = process.env.CV_CHROMIUM_PATH
  ? { executablePath: process.env.CV_CHROMIUM_PATH }
  : {};

const browser = await chromium.launch(launchOptions);
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(source).href, { waitUntil: "load" });
  await page.pdf({ path: output, preferCSSPageSize: true, printBackground: true });
} finally {
  await browser.close();
}

const pdf = await readFile(output);
const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page(?![s\w])/g) || []).length;
console.log(`Wrote ${path.relative(process.cwd(), output)} (${pages} pages, ${Math.round(pdf.length / 1024)} KB)`);
if (pages !== EXPECTED_PAGES) {
  console.warn(`Warning: expected ${EXPECTED_PAGES} pages. Adjust spacing in scripts/cv/cv.css.`);
}
