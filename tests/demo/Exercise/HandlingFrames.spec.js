import {test, expect} from '@playwright/test';


test('Handling Frames Test', async ({page}) => {
    
    await page.goto('https://ui.vision/demo/webtest/frames/');

    // Total number of frames
    const allFrames = page.frames();
    console.log('Total Number of Frames : ', allFrames.length);

    // Get the frame by name
    // const frame = page.frame('frame_name');
    // Get the frame by URL
    const frame_1 = await page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_1.html'});
    await frame_1.locator('//input[@name="mytext1"]').fill('Hello Frame 1');

    await page.waitForTimeout(2000); // Wait for 3 seconds to observe the result

    // Approach 2
    const frame_11 = await page.frameLocator('html > frameset > frame:nth-child(1)').locator('//input[@name="mytext1"]');
    await frame_11.fill('Hello Frame 11');

    await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result
});