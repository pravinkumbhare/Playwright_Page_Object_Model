import {test, expect} from '@playwright/test'
import { count } from 'console';


test('Select Option Test', async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator('//*[@id="country"]').scrollIntoViewIfNeeded();
    await page.locator('//*[@id="country"]').selectOption('India');   // Visible text

    await page.waitForTimeout(1000);
    await page.locator('//*[@id="country"]').selectOption({label: 'United Kingdom'}); // Label

    await page.waitForTimeout(1000);
    await page.locator('#country').selectOption({value: 'canada'}); // Value

    await page.waitForTimeout(1000);
    await page.locator('#country').selectOption({index: 5}); // Index

    await page.waitForTimeout(1000);
    await page.selectOption('#country', 'Germany'); // Select by other option.

    //Assertions

    // 1. To count the number of options in the dropdown
    const totalCount = await page.locator('#country option')
    await expect(totalCount).toHaveCount(10); // Assert total count of options in dropdown

    // 2. 
    const countryOptions = await page.$$('#country option')
    console.log('Total count is : ', countryOptions.length);
    expect(countryOptions.length).toBe(10);

    let flag = false;
    for(const option of countryOptions) {
        const country = await option.textContent()
        console.log("Country Name is : ", country)
        if(country.includes('France')){
            flag = true;
            console.log('Country is present in the dropdown..');
            break;
        }     
        
        // if(country?.trim().toLowerCase() === 'france'){
        //     flag = true;
        //     console.log('Country is present in the dropdown..')
        //     break;
        // }
    }

    expect(flag, 'Country is not present in the dropdown').toBeTruthy();

    // Iterate using Map
    const countryOptions2 = await page.$$('#country option')
    await Promise.all(countryOptions2.map( async (option) => {
        const country = await option.textContent()
        console.log('Country Name option2 is : ', country)

    }))


    // 3. Next option
    const country = await page.locator('#country').textContent('India'); // Select India
    expect(country.includes('India')).toBeTruthy(); // Assert that India is selected


    //4. To select the option from dropdown
    // let flag = false;
    const countryOption2 = await page.$$('#country option')

    for(const option of countryOption2) {
        const country = await option.textContent()
        console.log("Country Name is : ", country)
        if(country.includes('Australia')){
            // flag = true;
            console.log('Country is present in the dropdown..');
            page.selectOption('#country', 'Australia'); // Select France
            break;
        }     
    }

    // expect(flag, 'Country is not present in the dropdown').toBeTruthy();


    //wait for the dropdown to be populated
    await page.waitForTimeout(2000);
} )