import {test, expect} from '@playwright/test'

// skip(), only()

// skip with condition
test('Test5', ({page, browserName}) => {
    
    if(browserName === 'chromium'){
        test.skip()
    }
    console.log('Test5: skip with condition.')
})

// Fixme
test('Test6', () => {
    test.fixme()
    console.log('Test6: This test case need to fix ..')
})


// Fail
test('Test7', ({page, browserName}) => {
    
    console.log('Test7: This test case related to Fail Annotation ..')

    if(browserName === 'chromium'){

        test.fail()
    }
    
    // expect(1).toBe(1);
})


// Slow()
test('Test8', () => {
    // test.slow()
    test.setTimeout(7000)
    console.log('Test8: This test case need to run in slow mode ..')
})



