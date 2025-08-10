import { test, expect } from '@playwright/test'

export class ContactPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.contactUsPageTitle = page.locator('//h5[contains(text(),"New message")]');
        this.emailTextField = page.locator('#recipient-email');
        this.nameTextField = page.locator('#recipient-name');
        this.messageTextField = page.locator('#message-text');
        this.submitButton = page.locator('#exampleModal button:has-text("Send message")');
        this.closeButton = page.locator('#exampleModal button:has-text("Close")');
    }

    async fillContactInformation(email, name, message) {
       
        try{
            await this.emailTextField.fill(email);
            await this.nameTextField.fill(name);
            await this.messageTextField.fill(message);

            //Alert Popup/Dialog to handle
            await this.confirmationMessage('Thanks for the message!!');
            await this.submitButton.click();
            console.log('Contact information filled and submitted successfully!');
        
        } catch (error) {
            console.error(`❌ Error in fillContactInformation: ${error.message}`);
            throw error; // rethrow so test still fails
        }
        
    }


    async confirmationMessage(textMessage){

        try{
            // Enabling Dialog window  Handling  
            this.page.once('dialog', async dialog => {
        
                await expect(dialog.type()).toContain('alert');
                await expect(dialog.message()).toContain(textMessage);
                await dialog.accept();
            })
        } catch (error) {
                console.error(`❌ Error while handling confirmation dialog: ${error.message}`);
                throw error;
        }

       

    }
};