import {test, expect} from '@playwright/test'

test('Upload Files Test', async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.locator('//*[@id="singleFileInput"]').scrollIntoViewIfNeeded();
    // await page.locator('//*[@id="singleFileInput"]').click()
    // Upload single file
    await page.locator('//*[@id="singleFileInput"]').setInputFiles('tests/uploads/2025-26-NUR-16198.pdf');


    // Upload multiple files
    await page.locator('//*[@id="multipleFilesInput"]').setInputFiles(['tests/uploads/2025-26-NUR-16198.pdf', 'tests/uploads/Digital_Signature.pptx']);

    await expect(await page.locator('//*[@id="multipleFilesStatus"]')).not.toBe('No files selected.')

    await page.waitForTimeout(5000);
})

