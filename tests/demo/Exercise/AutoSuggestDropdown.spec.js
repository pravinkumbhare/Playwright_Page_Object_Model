import { test, expect } from '@playwright/test';

test('RedBus From City Auto Suggest Working', async ({ page }) => {
  await page.goto('https://www.redbus.in/');

  // Step 1: Click the "From" field to activate it
  const fromField = page.locator("//div[text()='From']/ancestor::div[contains(@class, 'labelCityWrapper')]");
  await fromField.click();

  // Step 2: Wait for the real input to appear (data-testid="src")
  const fromInput = page.locator("input[id^='src']");
  await fromInput.waitFor({ state: 'visible', timeout: 5000 });

  // Step 3: Type the city
  await fromInput.type('Pune', { delay: 100 });

  // Step 4: Wait for auto-suggestion list and select first option
  await page.waitForSelector('.autoFill.homeSearch li');
  await page.locator('.autoFill.homeSearch li').first().click();

  await page.waitForTimeout(3000); // for visual verification
});
