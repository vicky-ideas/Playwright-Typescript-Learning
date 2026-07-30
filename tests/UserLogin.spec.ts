import test from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { userData } from "../test-data/signupdata";
import { SignupPage } from "../pages/SignupPage";
import { env } from "../config/environment";
import { autoEmail } from "../utils/autoEmail";

test('Task 4 - Data driven testing in login page',async({page}) => {

    const loginPage = new LoginPage(page);

    const signupPage = new SignupPage(page);

    await signupPage.navigate(env.baseurl)

    await signupPage.clickSignUpLogin();

    await signupPage.verifySignUpFormVisible();

    console.log("Empty Email Field Check")

    await loginPage.fillPassword(userData.registerUserDate.Password);

    await loginPage.clickLoginButton();

    await  loginPage.validateEmailField(userData.loginUserData.emptyFieldMessage);

    console.log("Empty Password Field Check")
    
    await page.reload();

    const email = autoEmail.generateEmail();

    await loginPage.fillEmail(email);

    await loginPage.clickLoginButton();

    await  loginPage.validatePasswordField(userData.loginUserData.emptyFieldMessage);

    console.log("Invalid Password")
    
    await page.reload();

    await loginPage.fillEmail(email);

    await loginPage.fillPassword(userData.loginUserData.incorrectPassword);

    await loginPage.clickLoginButton();

    await  loginPage.incorrectEmailOrPasswordMessageCheck();

    console.log("Invalid Email")
    
    await page.reload();

    await loginPage.fillEmail(userData.loginUserData.incorrectEmail);

    await loginPage.fillPassword(userData.registerUserDate.Password);

    await loginPage.clickLoginButton();

    await  loginPage.incorrectEmailOrPasswordMessageCheck();


}) 