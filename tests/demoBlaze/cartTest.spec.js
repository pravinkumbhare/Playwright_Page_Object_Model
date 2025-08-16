import {test, expect} from '@playwright/test'
import { LoginPage } from '../../pages/login'  
import { HomePage } from '../../pages/home';    
import { CartPage } from '../../pages/cartPage';

import productItems from '../../test-data/qa/productStore.json' assert { type: 'json' };

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
    
    //To Do Item
    test.skip('Delete all Product items from the cart list', async ({page}) => {

        home = new HomePage(page);
        cart = new CartPage(page);

        // // Pre-requisite to delete the products
        // await home.gotoHomePage();
        // await home.verifyProductsAvailable();
        // await home.addProductToCart(productItems.Phones.Nexus);    // Product value fetch from JSON file
        // // To delete Products
        // await home.gotoCartPage();
        // const booleanValue1 = await cart.verifyProductAddedInCart(productItems.Phones.Nexus) 
        // await expect(booleanValue1).toBe(true, `Nexus 6 was not found in the cart`);


        // await home.gotoHomePage();
        // await home.verifyProductsAvailable();
        // await home.addProductToCart(productItems.Phones.Samsung_s6);   

        // await home.gotoCartPage();
        // // Check what value we are passing from JSON
        // console.log("🔍 Expected Product Name:", productItems.Phones.Samsung_s6);
        // // Run the verification
        // const booleanValue3 = await cart.verifyProductAddedInCart(productItems.Phones.Samsung_s6);
        // // Log what verifyProductAddedInCart returned
        // console.log("✅ Verification result for Samsung_s6:", booleanValue3);
        // await expect(booleanValue3).toBe(true, `Samsung_s6 was not found in the cart`);


        // await home.gotoHomePage();
        // await home.verifyProductsAvailable();
        // // await page.pause();
        // await home.addProductToCart(productItems.Phones.HTC);  
        // await home.gotoCartPage();
        // const booleanValue2 = await cart.verifyProductAddedInCart(productItems.Phones.HTC)
        // await expect(booleanValue2).toBe(true, `MacBook Pro was not found in the cart`);


        // To delete Items from Cart list
        await home.gotoCartPage();
        await cart.deleteAllProductPresentInCart();

    })


    test.skip('To verify the Purchase Order from the cart list', async ({page}) => {

        home = new HomePage(page);
        cart = new CartPage(page);
        
        // // Pre-requisite to delete the products
        // await home.gotoHomePage();
        // await home.verifyProductsAvailable();
        // await home.addProductToCart(productItems.Phones.Nexus);    // Product value fetch from JSON file
        // // To delete Products
        // await home.gotoCartPage();
        // const booleanValue1 = await cart.verifyProductAddedInCart(productItems.Phones.Nexus) 
        // await expect(booleanValue1).toBe(true, `Nexus 6 was not found in the cart`);

        // await home.gotoHomePage();
        // await home.verifyProductsAvailable();
        // await home.addProductToCart(productItems.Phones.Samsung_s6);   
        // // To delete Products
        // await home.gotoCartPage();
        // const booleanValue3 = await cart.verifyProductAddedInCart(productItems.Phones.Samsung_s6);
        // await expect(booleanValue3).toBe(true, `Samsung_s6 was not found in the cart`);

        // await home.gotoHomePage();
        // await home.verifyProductsAvailable();
        // await home.addProductToCart(productItems.Phones.HTC);  
        // await home.gotoCartPage();
        // const booleanValue2 = await cart.verifyProductAddedInCart(productItems.Phones.HTC)
        // await expect(booleanValue2).toBe(true, `MacBook Pro was not found in the cart`);

        
        const productNames = [productItems.Phones.Nexus, productItems.Phones.Samsung_s6, productItems.Phones.HTC]

        for(let productName of productNames){

            // Pre-requisite to delete the products
            await home.gotoHomePage();
            await home.verifyProductsAvailable();
            await home.addProductToCart(productName);    // Product value fetch from JSON file
            
            // To delete Products
            await home.gotoCartPage();
            const booleanValue = await cart.verifyProductAddedInCart(productName) 
            await expect(booleanValue).toBe(true,  productName +`  was not found in the cart`);

        }

        // To place purchase order
        await cart.placePurchaseOrder();
        await cart.verifyProductsPurchasedSuccessfully()
    })


    test('To verify the Summation of all Products price added in the cart', async ({page}) => {

        home = new HomePage(page);
        cart = new CartPage(page);
        
        const productNames = [productItems.Phones.Nexus, productItems.Phones.Samsung_s6, productItems.Phones.HTC]

        for(let productName of productNames){

            // Pre-requisite to delete the products
            await home.gotoHomePage();
            await home.verifyProductsAvailable();
            await home.addProductToCart(productName);    // Product value fetch from JSON file
            
            // To delete Products
            await home.gotoCartPage();
            const booleanValue = await cart.verifyProductAddedInCart(productName) 
            await expect(booleanValue).toBe(true,  productName +`  was not found in the cart`);

        }

        // To verify the Summation amount
        await cart.verifyTotalAmtForItemsAddedInCart()

        // To place purchase order
        await cart.placePurchaseOrder();
        await cart.verifyProductsPurchasedSuccessfully()
    })


});


 test.afterEach('Tear Down', async ({page}) => {

    home = new HomePage(page);

    // Logout
    await home.logout();
    await page.waitForTimeout(3000)
  })
