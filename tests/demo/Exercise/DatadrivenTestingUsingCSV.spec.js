import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const records = parse(
  fs.readFileSync(path.join(__dirname, "../../../test-data/qa/test_data.csv")),
  {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }
);

for (const record of records) {
  test.skip(`Data Driven Testing using CSV in Playwright ${record.TestcaseID}`, async ({ page }) => {
    await page.goto('https://www.youtube.com/');

    await page.locator('//*[@id="center"]/yt-searchbox/div[1]/form/input').fill(record.MobileName);

    await page.keyboard.press('Enter');

    await page.waitForTimeout(5000);
  });
}


// Pick specific row — for example "TC_004"
const record = records.find(r => r.TestcaseID === 'TC_004');

test(`Reading Data from CSV file`, async ({page}) => {

    if (!record) throw new Error("TestcaseID not found in CSV");

    await page.goto('https://www.youtube.com/')

    await page.locator('//*[@id="center"]/yt-searchbox/div[1]/form/input').fill(record.LaptopName)

    await page.keyboard.press('Enter')


    await page.waitForTimeout(5000)
})