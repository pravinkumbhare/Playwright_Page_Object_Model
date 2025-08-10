import {test, expect} from '@playwright/test';

test('WebTable Test', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Locate the web table
    page.locator('#productTable').scrollIntoViewIfNeeded();
    const table = await page.locator('#productTable');

    // Get all columns in the table
    const columns = table.locator('thead tr th');
    console.log("Number of Columns : ", await columns.count());
    await expect(columns).toHaveCount(4);

    // Get all rows in the table body
    const rows = await table.locator('tbody tr');
    console.log("Number of Rows : ", await rows.count());
    await expect(rows).toHaveCount(5);

    // 2. Select check box for Product 4

    const matchedRows = rows.filter({
        has: page.locator('td'),
        hasText: 'Smartwatch'
    })
    // Debug output
    console.log(await matchedRows.innerText());

    // ✅ Use RELATIVE locator, not XPath
    await matchedRows.locator('input[type="checkbox"]').check();

    // 3. Select multiple products using re-usable function
    await selectProduct(rows, page, 'Smartphone');
    await selectProduct(rows, page, 'Tablet');
    await selectProduct(rows, page, 'Wireless Earbuds');

    // 4. Print all Product details using for loop
    for(let i = 0; i < await rows.count(); i++){

        const row = rows.nth(i);
        const tds = row.locator('td');
        for(let j = 0; j < await tds.count(); j++){

            const tdText = await tds.nth(j).textContent();  
            console.log("Table Data: ", tdText);
        }
    }

    // 5. Read data from all the pages in the table
    const totalPages = await page.locator('//ul[@class="pagination"]/li/a');
    console.log("Total Pages: ", await totalPages.count());

    for(let pageIndex = 1; pageIndex < await totalPages.count(); pageIndex++){

         for(let i = 0; i < await rows.count(); i++){

            const row = rows.nth(i);
            const tds = row.locator('td');
            for(let j = 0; j < await tds.count(); j++){

                const tdText = await tds.nth(j).textContent();  
                console.log("Table Data: ", tdText);
            }

            await totalPages.nth(pageIndex).click();
            await page.waitForTimeout(1000); // Wait for 1 second to load the new page
        }

    }

    // // 6. Get the price of Product 4
    // const priceLocator = matchedRows.locator('td:nth-child(3)');
    // const price = await priceLocator.textContent();
    // console.log('Price of Product 4: ', price);

    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the table

});


async function selectProduct(rows, page, productName){

    const matchedRows = rows.filter({
        has: page.locator('td'),
        hasText: productName
    })

    // ✅ Use RELATIVE locator, not XPath
    await matchedRows.locator('input[type="checkbox"]').check();

    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the table
}