import {test, expect} from '@playwright/test';

test('All Product links test', async({page}) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator("//input[@id='user-name']").fill('standard_user');
    await page.locator("//input[@id='password']").fill('secret_sauce');
    await page.locator("//input[@id='login-button']").click();


    // Wait for the product list to load
    await page.waitForSelector("//div[@class='inventory_list']/div/div[2]//a");

    // Get all product links
    const allProductLinks = await page.$$("//div[@class='inventory_list']/div/div[2]//a");

    for(const productLink of allProductLinks){

        const linkText = await productLink.textContent();
        console.log('Product Name : ', linkText);
    }

});