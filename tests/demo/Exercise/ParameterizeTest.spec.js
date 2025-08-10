import {expect, test} from '@playwright/test'

const searchKeywords = ['Playwright by testers talk', 'Cypress by testers talk', 'Selenium by testers talk'];

for(const keyword of searchKeywords){

    test(`Parameterized Test ${keyword}`, async ({page}) => {

    await page.goto('https://www.youtube.com/')

    await page.locator('//*[@id="center"]/yt-searchbox/div[1]/form/input').fill(keyword)

    await page.locator('//*[@id="center"]/yt-searchbox/div[1]/form/input').page('Enter')


    await page.waitForTimeout(5000)
    })

}



