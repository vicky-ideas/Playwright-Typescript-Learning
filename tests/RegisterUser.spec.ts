import test from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";
import { registerUser } from "../pages/RegisterUserPage";
import { env } from "../config/environment";
import { userData } from "../test-data/signupdata"; 
import { autoEmail } from "../utils/autoEmail";
import { LoginPage } from "../pages/LoginPage";

test ("Task 2 - Register New user form", async({page})=> {

const registerUserPage = new registerUser(page);
const signupPage = new SignupPage(page);
const loginPage = new LoginPage(page);

const email = autoEmail.generateEmail();

await signupPage.navigate(env.baseurl);

await signupPage.clickSignUpLogin();

await signupPage.verifySignUpFormVisible();

await signupPage.enterName(userData.signUpUserData.name);

await signupPage.enterEmail(email);

await signupPage.clickSignUpButton();

await registerUserPage.clickCreateAccountButton();

await registerUserPage.verifyPasswordValidationMessage(userData.registerUserDate.PasswordValidation);

await registerUserPage.fillpassword(userData.registerUserDate.Password);

await registerUserPage.fillFirstName(userData.registerUserDate.FirstName);

await registerUserPage.fillLastName(userData.registerUserDate.LastName);

await registerUserPage.fillAddress(userData.registerUserDate.Address);

await registerUserPage.fillState(userData.registerUserDate.State);

await registerUserPage.fillCity(userData.registerUserDate.City);

await registerUserPage.fillZipCode(userData.registerUserDate.ZipCode);

await registerUserPage.fillMobileNumber(userData.registerUserDate.MobileNumber);

await registerUserPage.clickCreateAccountButton();

await registerUserPage.validateAccountCreatedMessage();

await registerUserPage.clickContinueButton();

await registerUserPage.clickLogout();

await loginPage.fillEmail(email);

await loginPage.fillPassword(userData.registerUserDate.Password);

await loginPage.clickLoginButton();

await registerUserPage.clickLogout();

})