import {test, expect} from '@playwright/test';

test('Assertion Test', async ({page})=> {

    await page.goto('https://demo.nopcommerce.com/register?returnUrl=%2F');

    // 1. expect(page).toHaveURL()
    await expect(page).toHaveURL('https://demo.nopcommerce.com/register?returnUrl=%2F');

    //Soft Assertion
    // 13. expect.soft('locator').toHaveURL()
    await expect.soft(page).toHaveURL('https://demo.nopcommerce.com/register?returnUrl=%2F11111111111111111111');

    // 2. expect(page).toHaveTitle()
    await expect(page).toHaveTitle('nopCommerce demo store. Register')

   	// 3. expect('locator').toBeVisible()
   await expect(page.locator("//input[@id='Email']")).toBeVisible();

    // 4. expect('locator').toBeEnabled()
    await expect(page.locator("//input[@id='Email']")).toBeEnabled();

   	// 5. expect('locator').toBeDisabled() (Negative Assertion)
    await expect(page.locator("//input[@id='Newsletter']")).not.toBeDisabled();

   	// 6. expect('locator').toBeChecked()
    await expect(page.locator("//input[@id='Newsletter']")).toBeChecked();

   	// 7. expect('locator').toHaveAttribute()
    await expect(page.locator("//input[@id='Newsletter']")).toHaveAttribute('type', 'checkbox');

   	// 8. expect('locator).toHaveText()
    await expect(page.locator("//*[@id='main']/div/div/div/div[2]/form/div[3]/div[2]/div/label")).toHaveText('Newsletter:');

	// 9. expect('locator').toContainText()
    // await expect(page.locator("//*[@id='main']/div/div/div/div[2]/form/div[1]/div[2]/div[4]/label']")).toContainText('Email');
    await expect(page.locator("//div[@class='inputs']/label[text()='Email:']")).toContainText('Email');


    // 10. expect('locator').toHaveValue()
    await page.locator("//input[@id='Email']").fill('pravin.kumbhare1@gmail.com');
    await expect(page.locator("//input[@id='Email']")).toHaveValue('pravin.kumbhare1@gmail.com');

    // 11. expect('locator').toHaveCount()
    const emailInput = page.locator("//input[@id='Email']");
    await expect(emailInput).toHaveCount(1);

    // 12. expect('locator').toHaveScreenshot()
    await expect(page).toHaveScreenshot({ fullPage: true });


});