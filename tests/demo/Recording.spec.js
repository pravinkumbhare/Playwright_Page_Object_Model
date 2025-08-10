import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login'

test('test', async ({ page }) => {

  const login = new LoginPage(page);

  await login.gotoLoginPage(); 
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');

  await login.login('tomsmith', 'supersecretpassword');
  

  // await page.getByRole('textbox', { name: 'Username' }).click();
  // await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  // await page.getByRole('textbox', { name: 'Password' }).click();
  // await page.getByRole('textbox', { name: 'Password' }).fill('supersecretpassword');
  // await page.getByRole('button', { name: ' Login' }).click();

});

