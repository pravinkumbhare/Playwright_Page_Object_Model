import { test, expect, chromium } from '@playwright/test' 

test('Fixture Test', async ({page, browser, context, browserName}) => {

    // const browser = chromium.launch()
    // const context = browser.newContext()
    // const page1 = context.newPage()
    // page1.goto('https://www.orangehrm.com/')

    // We don't need to use above lines if we are using page fixture.
    await page.goto('https://www.orangehrm.com/')

    console.log(await context.cookies())
    console.log("After clearing Cookies")
    console.log(await context.clearCookies())

    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto('https://www.orangehrm.com/')
    const totalPages = context.pages();
    console.log("Total Pages: ", totalPages.length)

    console.log("Browser Name: ", browserName)

})