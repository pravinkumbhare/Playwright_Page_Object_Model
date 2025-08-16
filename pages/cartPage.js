import { expect } from "allure-playwright";

export class CartPage {

    constructor(page){
        this.page = page;
        this.productItemsAddedInCart = page.locator('//tbody[@id="tbodyid"]/tr/td[2]');
        this.totalProductItemsInCartList = page.locator('#tbodyid tr')
        this.delete_Link = page.locator('#tbodyid tr td a')
        this.placeOrderButton = page.locator('.btn.btn-success')
        this.placeOrderTitle = page.locator('//h5[contains(text(),"Place order")]')
        this.name = page.locator('#name')
        this.country = page.locator('#country')
        this.city = page.locator('#city')
        this.card = page.locator('#card')
        this.month = page.locator('#month')
        this.year = page.locator('#year')
        this.purchaseButton = page.locator('//button[contains(text(),"Purchase")]')

        this.purchasedConfirmMsg = page.locator('//h2[contains(text(),"Thank you for your purchase!")]')
        this.ok_Button = page.locator('//button[contains(text(),"OK")]')

        this.table = page.locator('//table[@class="table table-bordered table-hover table-striped"]')
        this.columns = page.locator('thead tr th')
        this.rows = page.locator('#tbodyid tr')
        this.totalPrice = page.locator('#totalp')
    }

    async verifyProductAddedInCart(productName){

        // await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('#tbodyid tr', { state: 'visible', timeout: 10000 });  //Replaced waitForTimeout(5000) with a smarter wait

        const count = await this.productItemsAddedInCart.count();
        console.log('Total Products added in Cart : ', count)

        for(let i=0; i<count; i++){
            const text = await this.productItemsAddedInCart.nth(i).textContent();
            
            if(text.includes(productName)){
                console.log(`Product ${productName} is successfully added in the Cart List.`)
                // console.log('Product '+ productName +' is successfully added in the Cart List.')

                return true;
            }
        }
        return false;
    }

    // To Do
    async deleteAllProductPresentInCart() {
        await this.page.waitForTimeout(2000);
        let count = await this.page.locator('#tbodyid tr').count();

        while (count > 0) {
            await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                this.page.locator('#tbodyid tr td a').first().click()
            ]);
            count = await this.page.locator('#tbodyid tr').count();
        }
   }

    async placePurchaseOrder(){

        await this.placeOrderButton.waitFor({ state: 'visible' })
        await this.placeOrderButton.click()
        await this.placeOrderTitle.waitFor({ state: 'visible' })
        await this.name.fill('Pravin')
        await this.country.fill('India')
        await this.city.fill('Nagpur')
        await this.card.fill('1234567890')
        await this.month.fill('June')
        await this.year.fill('2025')
        await this.purchaseButton.click()
    }

    async verifyProductsPurchasedSuccessfully(){

        await this.purchasedConfirmMsg.waitFor({ state: 'visible'})
        await this.ok_Button.click()
        console.log('Products from the cart are purchased successfully!!!')
        // await this.purchaseButton.waitFor({ state: 'visible', timeout: 5000}) <= it is failing inconsistently
        await this.page.waitForSelector('//button[contains(text(),"Purchase")]', { state: 'visible', timeout: 10000})
        await this.purchaseButton.click()
    }


    async verifyTotalAmtForItemsAddedInCart(){
        let SumAmount = 0
        let amount = 0

        // Get all rows in the table
        const totalRows = this.rows
        console.log('totalRows : ', await totalRows.count())

        for(let i=0; i<await totalRows.count(); i++){

            const cellData = await totalRows.nth(i).locator('td')

            console.log("Product Price is : ", await cellData.nth(2).textContent())
            // amount = parseInt((await cellData.nth(2).textContent()).trim(), 10) 
            amount = parseInt((await cellData.nth(2).textContent()).replace(/[^0-9]/g, ''))
            SumAmount = SumAmount + amount
        }
        console.log("SumAmount is : ", SumAmount)

        const totalPrize = parseInt((await this.totalPrice.textContent()).replace(/[^0-9]/g, ''))
        console.log("Total Prize is : ", totalPrize)

        // Verify the total amount
        await expect(this.totalPrice).toBeVisible()
        await expect(SumAmount).toEqual(totalPrize)
        console.log('Total Prize is verified successfully!!!')  

    }

}

