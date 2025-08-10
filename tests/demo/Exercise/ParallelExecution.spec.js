import {test, expect} from '@playwright/test'

// test.beforeAll('BeforeAll', () => {
//     console.log('Before All Test')
// })

// test.afterAll('AfterAll', () => {
//     console.log('After All Test')
// })

// test.beforeEach('BeforeEach', () => {
//     console.log('Before Each Test')
// })

// test.afterEach('AfterEach', () => {
//     console.log('After Each Test')
// })

test.describe('Smoke Testcases', () => {

    test('Test1', async ({page}) => {

    console.log('Test1 is executed.')
})

    test('Test2', async ({page}) => {

        console.log('Test2 is executed.')
    })

});

test.describe('Sanity Testcases', () => {

    test('Test3', async ({page}) => {

        console.log('Test3 is executed.')
    })

    test('Test4', async ({page}) => {

        console.log('Test4 is executed.')
    })

});

test.describe('Regression Testcases', () => {

    test('Test5', async ({page}) => {

        console.log('Test5 is executed.')
    })

});


