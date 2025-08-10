export class LoginPage {

    constructor(page) {
        this.page = page;

        // Prefer using locators directly
        this.loginOption = page.locator('#login2');
        this.userNameField = page.locator('#loginusername');
        this.passwordField = page.locator('#loginpassword');
        this.loginButton = page.locator('//button[@onclick="logIn()"]'); 
    }

    async gotoLoginPage() {
        // await this.page.goto('https://www.demoblaze.com/');
           await this.page.goto(process.env.URL);

    }

    async login(username, password) {
        await this.loginOption.click();
        await this.userNameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
        console.log('Login done successfully!!!')

    }

    
};
