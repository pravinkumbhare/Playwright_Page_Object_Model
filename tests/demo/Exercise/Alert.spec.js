import {test, expect} from '@playwright/test';

test.skip('Alert Test', async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Enabling Alert Handling  // Dialog window handling
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('I am an alert box!');
        await dialog.accept();
    })

    await page.locator("//button[@id='alertBtn']").click();



    await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result
});


test.skip('Confirmation Dialog-Alert with Ok and Cancel', async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Enabling Dialog window  Handling  
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Press a button!');
        await dialog.accept();
        // await dialog.dismiss(); // To cancel the dialog
    })

    await page.locator("//button[@id='confirmBtn']").click();


    await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result
});



test('Prompt Dialog', async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Enabling Prompt Dialog window  Handling  
    page.on('dialog', async dialog => {

        expect(dialog.type()).toContain('prompt');
        expect(dialog.message()).toContain('Please enter your name');
        await dialog.defaultValue('Harry Potter');
        await dialog.accept('Pravin Kumbhare');
    })

    await page.locator("//button[@id='promptBtn']").click();


    await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result
});