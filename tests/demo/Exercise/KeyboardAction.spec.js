import {test, expect} from '@playwright/test'

test('Keyboard Action Test', async ({page})=> {

    await page.goto("https://gotranscript.com/text-compare");

    // await page.locator('//*[@id="diff"]/form/div[1]/div[1]/textarea').fill('Please do copy and paste.');
    await page.type('//*[@id="diff"]/form/div[1]/div[1]/textarea', 'Please do copy and paste.')

    // await page.pause();

    // Ctrl+A
    await page.keyboard.press('Control+A')
    await page.waitForTimeout(1000);

    // Ctrl+C
    await page.keyboard.press('Control+C')
    await page.waitForTimeout(1000);

    //TAB
    await page.keyboard.down('Tab')
    await page.keyboard.up('Tab')
    await page.waitForTimeout(1000);

     // Ctrl+V
    await page.keyboard.press('Control+V')

    const pastedData = await page.locator('//*[@id="diff"]/form/div[1]/div[2]/textarea').inputValue();
    await expect(pastedData).toBe('Please do copy and paste.')

    await page.waitForTimeout(5000);

})
