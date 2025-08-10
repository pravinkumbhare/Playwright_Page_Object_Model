import {test, expect} from '@playwright/test'

test('Mouse Double', async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator('//*[@id="HTML10"]/div[1]/button').scrollIntoViewIfNeeded();
    const button = page.locator('//*[@id="HTML10"]/div[1]/button');

    await page.waitForTimeout(2000);
    await button.dblclick();

    await expect(await page.locator('//*[@id="field2"]')).toHaveValue('Hello World!');

    await page.waitForTimeout(2000);
} );