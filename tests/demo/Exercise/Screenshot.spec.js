import {test, expect} from '@playwright/test'
import path from 'path'

test('Page Screenshot', async ({page}) => {

    await page.goto('https://www.opencart.com/')    
    await page.screenshot({path: 'tests/screenshots/'+ Date.now +'screenshot.png'}) 
})

test('Full Screenshot', async ({page}) => {

    await page.goto('https://www.opencart.com/')    
    await page.screenshot({path: 'tests/screenshots/'+ Date.now +'full_screenshot.png', fullPage: true }) 
})

test('Element Screenshot', async ({page}) => {

    await page.goto('https://www.opencart.com/')    
    await page.locator('//*[@id="hero"]/div[1]/div[1]/div/div/div[1]/a[1]').screenshot({path: 'tests/screenshots/'+ Date.now +'Locator_screenshot.png'}) 
})
