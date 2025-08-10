import {test, expect} from '@playwright/test'

test('Multi Select Dropdown Test', async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Click on the dropdown to open it
    await page.locator('#colors').scrollIntoViewIfNeeded();
    await page.locator('#colors').click();
    await page.locator('#colors').selectOption(['Red', 'Blue', 'Green']); // Select multiple options

    // Using Array to select multiple option
    const options = await page.$$('#colors option');
    console.log("Selected options are: ", options.length);

    // Assert
    await expect(options.length).toBe(7); // Assert total count of options in dropdown
    // OR
    await expect(options).toHaveLength(7);

    // Verify value is present in the dropdown
    const countryOptions = await page.locator('#colors').textContent();
    await expect(countryOptions.includes('Green')).toBeTruthy();
    await expect(countryOptions.includes('Black')).toBeFalsy();


    // Verify if the options are selected

    await page.waitForTimeout(2000); // Wait for 2 second to observe the selection
});