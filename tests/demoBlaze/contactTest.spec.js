import {test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login'  
import { HomePage } from '../../pages/home';  
import { ContactPage } from '../../pages/contactPage';

import data from '../../test-data/qa/constant.json' assert { type: 'json'};

let login;
let home;
let contact;

const CONSTANT = [process.env.USER_NAME, process.env.PASSWORD]

test.beforeEach('Pre-requisite', async ({page}) => {

    // Create Page Object
    login = new LoginPage(page);
    home = new HomePage(page);

    // Login
    await login.gotoLoginPage();
    await login.login(CONSTANT[0], CONSTANT[1]);
    // await expect(home.verifyLoginSuccess()).toBeTruthy();
    await expect (home.logoutLink).toBeVisible();
});


test.describe('Group test for Contact page', () => {
    
    test('To verify Contact is added successfully', async ({page}) => {

        home = new HomePage(page);
        contact = new ContactPage(page);

        // Home
        await home.gotoHomePage();
 
        await home.gotoContactPage();
        await contact.fillContactInformation(data.email, data.name, data.message);
    });

});

 test.afterEach('Tear Down', async ({page}) => {

    home = new HomePage(page);

    // Logout
    await home.logout();
    await page.waitForTimeout(3000);
    
  });
