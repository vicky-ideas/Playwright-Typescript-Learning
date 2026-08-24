import {test} from "../fixtures/fixtures";
import { userData } from "../test-data/signupData";
import { env } from "../config/environment";
import { autoEmail } from "../utils/autoEmail";

test('Task 4 - Data driven testing in login page',async({signupPage, loginPage, basePage}) => {

    const email = autoEmail.generateEmail();

    await test.step("Open Signup Form", async () => {
        await signupPage.openSignupForm();
    });

await test.step("Validate Empty Email Field", async () => {
    await loginPage.validateEmptyEmailFieldValidation(userData.registerUserDate.Password,userData.loginUserData.emptyFieldMessage);
});

await test.step("Validate Empty Password Field", async () => {
    await basePage.reloadpage();

    await loginPage.validateEmptyPasswordFieldValidation(email,userData.loginUserData.emptyFieldMessage);
});

await test.step("Validate Invalid Password ", async () => {
    await basePage.reloadpage();

    await loginPage.login(email,userData.loginUserData.incorrectPassword);

    await loginPage.incorrectEmailOrPasswordMessageCheck();
});

await test.step("Validate Invalid Email ", async () => {
    await basePage.reloadpage();

    await loginPage.login(userData.loginUserData.incorrectEmail,userData.registerUserDate.Password);

    await loginPage.incorrectEmailOrPasswordMessageCheck();
});


}) 