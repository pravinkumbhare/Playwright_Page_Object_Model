import {test, expect} from '@playwright/test';

test('Radio Button Test', async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Click on the radio button for Male
    await page.locator("//input[@value='male']").click();

    // Assert that the Male radio button is checked
    await expect(await page.locator("//input[@value='male']")).toBeChecked();
    await expect(await page.locator("//input[@value='female']")).not.toBeChecked();

    await expect(await page.locator("//input[@value='male']").isChecked()).toBeTruthy();
    await expect(await page.locator("//input[@value='female']").isChecked()).toBeFalsy();

    await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result

})

