import {test, expect} from '@playwright/test'

test.beforeAll('BeforeAll', () => {
    console.log('Before All Test')
})

test.afterAll('AfterAll', () => {
    console.log('After All Test')
})

test.beforeEach('BeforeEach', () => {
    console.log('Before Each Test')
})

test.afterEach('AfterEach', () => {
    console.log('After Each Test')
})

test.describe.skip('Group1', () => {

    test('Test1', () => {

    console.log('Test1 is executed.')
})

    test('Test2', () => {

        console.log('Test2 is executed.')
    })

});

test.describe.only('Group2', () => {

    test('Test3', () => {

        console.log('Test3 is executed.')
    })

    test('Test4', () => {

        console.log('Test4 is executed.')
    })

});

test.describe('Group3', () => {

    test('Test35', () => {

        console.log('Test5 is executed.')
    })

});


