import {test, expect} from '@playwright/test';

test('Mouse Hover Test', async ({page}) => {


    // Navigate to the page with mouse hover functionality
    await page.goto('https://the-internet.herokuapp.com/hovers');

    // Hover over the first user profile
    const firstProfile = page.locator('.figure').nth(0);
    await page.waitForTimeout(2000);
    await firstProfile.hover();

    // Assert that the user profile text is visible after hovering
    await expect(firstProfile.locator('h5')).toBeVisible();
    
    // Optionally, you can also check the text of the hovered profile
    await expect(firstProfile.locator('h5')).toHaveText('name: user1');
    
    // Wait for a few seconds to observe the hover effect
    await page.waitForTimeout(3000);

});
