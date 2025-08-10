import { test } from '@playwright/test'

test('ENV Config Test', async () => {

    console.log("URL : ", process.env.ENV)
    console.log("Username: ", process.env.USER_NAME)
    console.log("Password: ", process.env.PASSWORD)
})


