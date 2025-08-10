export class CartPage {

    constructor(page){
        this.page = page;
        this.productsAddedInCart = page.locator('//tbody[@id="tbodyid"]/tr/td[2]');
    }

    async verifyProductAddedInCart(productName){

        // await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('#tbodyid tr')      //Replaced waitForTimeout(5000) with a smarter wait

        const count = await this.productsAddedInCart.count();
        console.log('Total Products added in Cart : ', count)

        for(let i=0; i<count; i++){
            const text = await this.productsAddedInCart.nth(i).textContent();
            
            if(text.includes(productName)){
                console.log(`Product ${productName} is successfully added in the Cart List.`)
                // console.log('Product '+ productName +' is successfully added in the Cart List.')

                return true;
            }
        }
        return false;
    }
}

