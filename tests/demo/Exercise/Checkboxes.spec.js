import {test, expect} from '@playwright/test';

test('Checkboxes test', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Click on the checkbox for Option 1
    await page.locator("//input[@value='sunday']").click();

    // Assert that the Option 1 checkbox is checked
    await expect(await page.locator("//input[@value='sunday']")).toBeChecked();
    await expect(await page.locator("//input[@value='monday']")).not.toBeChecked();

    await expect(await page.locator("//input[@value='sunday']").isChecked()).toBeTruthy();
    await expect(await page.locator("//input[@value='monday']").isChecked()).toBeFalsy();

    await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result

    // To work with multiple checkboxes for Days to be checked and Unchecked i.e. Randomly between Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    for (const day of days) {
        const checkbox = await page.locator(`//input[@value='${day}']`);
        if (Math.random() > 0.5) {
            await checkbox.check();
        } else {
            await checkbox.uncheck();
        }
    }

});
