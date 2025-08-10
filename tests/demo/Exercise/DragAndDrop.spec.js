import {test, expect} from '@playwright/test'

test('Drag and Drop', async ({page}) => {


    await page.goto('https://testautomationpractice.blogspot.com/');

    // Option 1
    const dragOption = await page.locator('//*[@id="draggable"]');
    const dropOption = await page.locator('//*[@id="droppable"]');

    await page.locator('//*[@id="draggable"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await dragOption.dragTo(dropOption);

    // Option 2
    // await page.locator('//*[@id="draggable"]').scrollIntoViewIfNeeded();
    // await page.waitForTimeout(2000);
    // await dragOption.hover()
    // await page.mouse.down()

    // await dropOption.hover()
    // await page.mouse.up()

    await page.waitForTimeout(2000);
});

