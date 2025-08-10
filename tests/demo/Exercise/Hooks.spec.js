import {test, expect} from '@playwright/test'

let page;
    
    test.beforeAll('BeforeAll Test', async ({browser}) => {

        page = await browser.newPage();
        await page.waitForTimeout(2000)
        console.log("================ Before All Method ================")
    })


    test.beforeEach('BeforeEach Test', async ({}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.waitForTimeout(2000)
    console.log("================ Before Each Method ================")
    });

    test('Hooks Test1', async ({}) => {

        // Add your test steps here
        console.log("================ Login Test Method ================")

    });

    test('Hooks Test2', async ({}) => {

        // Add your test steps here
        console.log("================ Logout Test Method ================")

    });

    test.afterEach('AfterEach Test', async({}) => {

        await page.waitForTimeout(2000)
        console.log("================ After Each Method ================")
    })

    test.afterAll('AfterAll Test', async ({}) => {

        await page.waitForTimeout(2000)
        console.log("================ After All Method ================")
        await page.close(); 

    })
