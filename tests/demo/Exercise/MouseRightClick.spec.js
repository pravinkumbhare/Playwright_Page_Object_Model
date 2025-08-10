import {test, expect} from '@playwright/test';

test('Mouse Right Click Test', async ({page}) => {

    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');

    const button = await page.locator('//html/body/div/section/div/div/div/p/span');

    // right click action
    await button.click({button: 'right'});

    await page.waitForTimeout(2000);

});

