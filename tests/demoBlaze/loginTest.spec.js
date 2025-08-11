import {test, expect} from '@playwright/test'
import { LoginPage } from '../../pages/login'  
import { HomePage } from '../../pages/home';    
import { CartPage } from '../../pages/cartPage';

import productName from '../../test-data/qa/youtubeSearch.json' assert { type: 'json' };

let login;
let home;
let cart;

const CONSTANT = [process.env.USER_NAME, process.env.PASSWORD];

test.beforeEach(async ({page}) => {

    // Create Page Object
    login = new LoginPage(page);
    home = new HomePage(page);

    // Login
    await login.gotoLoginPage();
    await login.login(CONSTANT[0], CONSTANT[1]);
    // await expect(home.verifyLoginSuccess()).toBeTruthy();
    await expect (home.logoutLink).toBeVisible();
});

test.describe('Group test', () => {
    
    test('Add Product and Verify in Cart', async ({page}) => {

        home = new HomePage(page);
        cart = new CartPage(page);

        // Home
        await home.gotoHomePage();
        await home.verifyProductsAvailable();
        await home.addProductToCart(productName.ProductName.NexusLaptop);    // Product value fetch from JSON file
        
        await home.gotoCartPage();
        const booleanValue = await cart.verifyProductAddedInCart(productName.ProductName.NexusLaptop)  // Product value fetch from JSON file
        await expect(booleanValue).toBe(true, `Nexus 6 was not found in the cart`);

    });


    const searchKeywords = ['HTC One M9', 'MacBook Pro', 'Apple monitor 24'];
    
    for(const keyword of searchKeywords){
    
        test.only(`Parameterized Test ${keyword}`, async ({page}) => {
    
        home = new HomePage(page);
        cart = new CartPage(page);

        // Home
        await home.gotoHomePage();
        await home.verifyProductsAvailable();

        if(keyword.match('HTC One M9')) {
            await home.gotoPhoneCategory();

        }else if(keyword.match('MacBook Pro')){
            await home.gotoLaptopCategory();

        }else{
            await home.gotoMonitorCategory();

        }
        
        await home.addProductToCart(keyword);    

        await home.gotoCartPage();
        const booleanValue = await cart.verifyProductAddedInCart(keyword)  
        await expect(booleanValue).toBe(true, keyword + ` was not found in the cart`);

        await page.waitForTimeout(5000)
        })
    
    }

});


 test.afterEach('Tear Down', async ({page}) => {

    home = new HomePage(page);

    // Logout
    await home.logout();
    await page.waitForTimeout(3000)
  })
