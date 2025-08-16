import { expect } from "@playwright/test";

export class HomePage{

    constructor(page){
        this.page = page;
        
        // Prefer using locators directly
        this.homePageLink = page.locator('//*[@id="navbarExample"]//a[contains(text(),"Home")]');
        this.productLinks = page.locator('//div[@id="tbodyid"]//div/h4/a');
        this.categories = page.locator('//*[@id="cat"]');
        this.addToCartButton = page.locator('//*[@id="tbodyid"]/div[2]/div/a');
        this.logoutLink = page.locator('#logout2');

        this.cartPageLink = page.locator('//*[@id="navbarExample"]/ul/li[4]/a');
        this.placeOrderButton = page.locator('//button[text()="Place Order"]');

        this.contactPageLink = page.locator('//*[@id="navbarExample"]/ul/li[2]/a');
        this.contactUsPageTitle = page.locator('//h5[contains(text(),"New message")]');

        this.aboutUsPageLink = page.locator('//*[@id="navbarExample"]/ul/li[3]/a');

        // Home Page Categories
        this.phoneCategory = page.locator('//a[contains(text(),"Phones")]')
        this.laptopCategory = page.locator('//a[contains(text(),"Laptops")]')
        this.monitorCategory = page.locator('//a[contains(text(),"Monitors")]')

        // Phone,Laptop,Monitor Category Locators
        this.productItems = page.locator('//div[@id="tbodyid"]//h4/a')
    }

    async gotoHomePage(){
        await this.homePageLink.click();
        await this.categories.isVisible();  // wait for home page to appear
        console.log('Home page is displayed successfully!!!.')
    }


    async verifyProductsAvailable(){
        await this.page.reload();
        await this.productLinks.first().waitFor({ state: 'visible', timeout: 5000 });  // wait to load the elements

        const productCount = await this.productLinks.count();    // return number of products present in the list
        console.log('ProductCount: ', productCount);
        await expect(productCount).not.toBe(0);
        console.log('Products are present in Home Page.')
    }

    // async addProductToCart(productName){

    //     // await  = this.productLinks.testContext();
    //     // const allProducts = this.page.$$(this.productLinks);
    //     // Use string selector directly, not a Locator
    //     const allProducts = await this.page.$$('//div[@id="tbodyid"]//div/h4/a');
    //     for(const productLink of allProducts){

    //         if((await productLink.textContent()).includes(productName)){
    //             console.log('Product is selecting now : ', await productLink.textContent())
    //             await productLink.click();
    //             break;
    //         }
    //     }

    //     // Handle alert dialog
    //     await this.page.on('dialog', async dialog => {
    //         if(dialog.message().includes('Product added.')) {
               
    //            await dialog.accept();
    //         }
    //     } )
    //     await this.addToCartButton.click();

    // this.page.once('dialog', dialog => dialog.accept());
    // await this.addToCartButton.click();

    // }

    // Alternate method for the above addProductToCard()
    async addProductToCart(productName) {
    const count = await this.productLinks.count();

    for (let i = 0; i < count; i++) {
        const productElement = this.productLinks.nth(i);
        const text = await productElement.textContent();

        if (text.includes(productName)) {
            await productElement.click();
            console.log('Product is selected: ', text);
            break;
        }
    }

    // Handle alert dialog
    // Attach dialog handler before click
    this.page.once('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
    });
    
    // Click and wait for the alert to appear instead of Hardcoded wait
    await Promise.all([this.page.waitForEvent('dialog'), this.addToCartButton.click()])

    // await this.page.waitForTimeout(2000);  // After adding this wait resolved inconsistent failing..
}


    async gotoCartPage(){
        await this.cartPageLink.click();
        await this.page.waitForLoadState('load');
        await this.placeOrderButton.isVisible();  // wait for cart page to appear
        console.log('Cart page is displayed successfully!!!.')
    }

    async gotoContactPage(){
        await this.contactPageLink.click();
        await this.contactUsPageTitle.isVisible(); // wait for contact page to appear
        console.log('Contact page is displayed successfully!!!')
    }

    /**
     * Logs the user out from the application.
     * @returns {Promise<void>} Resolves when logout is complete.
     */
    async logout() {
        // Refresh the page but don't wait forever for background requests
        await this.page.reload({ waitUntil: 'domcontentloaded' });

        // Optional: ensure logout link is visible before clicking
        await this.logoutLink.waitFor({ state: 'visible' });

        await this.logoutLink.click();
        await this.page.waitForSelector('#login2');
        console.log('Logout done successfully!!!');
    }

    async gotoPhoneCategory(){

        await this.phoneCategory.click()
        console.log('Phone options are displayed successfully!!!')
    }

    async gotoLaptopCategory(){

        await this.laptopCategory.click()
        console.log('Laptop options are displayed successfully!!!')
    }

    async gotoMonitorCategory(){

        await this.monitorCategory.click()
        console.log('Monitor options are displayed successfully!!!')
    }
}