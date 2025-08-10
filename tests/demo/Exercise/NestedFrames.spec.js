import {test, expect} from '@playwright/test';

test('Nested Frames Test', async ({page}) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame_3 = await page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_3.html'});

    await frame_3.locator('//*[@id="id3"]/div/input').fill('Hello Frame 3');

    const allChildFrames = frame_3.childFrames();
    console.log('Total Number of Child Frames in Frame 3: ', allChildFrames.length);

    // Get the first child frame
    await allChildFrames[0].locator('//*[@id="i6"]/div[3]/div').check();
    // await allChildFrames[0].locator('//*[@id="i6"]/div[3]/div').uncheck();

    await expect(allChildFrames[0].locator('//*[@id="i6"]/div[3]/div'), 
                                            "First child frame checkbox is not checked.").toBeChecked();

    await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result

});