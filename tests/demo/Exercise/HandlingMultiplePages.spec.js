import { test, expect, chromium } from '@playwright/test'

test('Handling Pages', async () => {

    const browser = await chromium.launch()
    const context = await browser.newContext()

    const page1 = await context.newPage()
    const page2 = await context.newPage();
    // const page3 = await context.newPage();
    console.log("Total no. of pages: ", (context.pages()).length)


    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await expect(page1).toHaveTitle('OrangeHRM')

    await page2.goto('https://www.orangehrm.com/')
    await expect(page2).toHaveTitle('Human Resources Management Software | HRMS | OrangeHRM')

    browser.close()
})


test.only('Handling Multiple Pages', async () => {

    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page1 = await context.newPage()

    await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    expect(page1).toHaveTitle('OrangeHRM')

    const newTab = context.waitForEvent('page')
    page1.locator('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[3]/div[2]/p[2]/a').click()

    const newTabPage = await newTab;
    const newPageButton = await newTabPage.locator('//*[@id="navbarNav"]/ul[2]/li[2]/a/button')
    await expect(newPageButton).toBeVisible()

    // page1.waitForTimeout(3000)
    // newTabPage.waitForTimeout(3000)

    browser.close()
})



