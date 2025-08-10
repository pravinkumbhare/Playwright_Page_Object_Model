import {test, expect} from '@playwright/test'
import { Module1TestData } from '../../../test-data/qa/youtubeSearch.json'

test.skip('Reading Data from JSON file', async ({page}) => {

    await page.goto('https://www.youtube.com/')

    await page.locator('//*[@id="center"]/yt-searchbox/div[1]/form/input').fill(Module1TestData.Skill1)

    await page.locator('//*[@id="center"]/yt-searchbox/div[1]/form/input').page('Enter')


    await page.waitForTimeout(5000)
})


for (const [key, value] of Object.entries(Module1TestData)) {
   
    test(`Data Driven Testing using JSON in Playwright ${value}`, async ({page}) => {

        await page.goto('https://www.youtube.com/')

        await page.locator('//*[@id="center"]/yt-searchbox/div[1]/form/input').fill(value)

        await page.locator('//*[@id="center"]/yt-searchbox/div[1]/form/input').page('Enter')


        await page.waitForTimeout(5000)
    })
}


