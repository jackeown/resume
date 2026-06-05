import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [, , resumeHtml, cvHtml, outputDir] = process.argv;

if (!resumeHtml || !cvHtml || !outputDir) {
  console.error("Usage: node render-pdfs.mjs <resume-html> <cv-html> <output-dir>");
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();

async function renderPdf(htmlPath, pdfName) {
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });
  await page.goto(pathToFileURL(resolve(htmlPath)).href, {
    waitUntil: "networkidle",
  });

  await page.pdf({
    path: resolve(outputDir, pdfName),
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: true,
  });

  await page.close();
}

await renderPdf(resumeHtml, "resume.pdf");
await renderPdf(cvHtml, "cv.pdf");

await browser.close();
