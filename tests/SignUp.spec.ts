import test from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";
import { env } from "../config/environment";
import { userData } from "../test-data/signupdata"; 
import { autoEmail } from "../utils/autoEmail";

let signupPage : SignupPage;

test.beforeEach(async({page}) => {

signupPage = new SignupPage(page);

await signupPage.navigate(env.baseurl);

await signupPage.clickSignUpLogin();

await signupPage.verifySignUpFormVisible();

});

test ("Task 1 - verify signup form", async({page})=> {

const email = autoEmail.generateEmail();

await signupPage.enterName(userData.signUpUserData.name);

await signupPage.enterEmail(email);

})

test("Task 3 - case 1 - Empty Field Validation Check", async({page}) => {

await signupPage.clickSignUpButton();

await signupPage.validateNameValidation(userData.registerUserDate.PasswordValidation)

})

test("Task 3 - case 2 - Ivalid email format validation Check", async({page}) => {

await signupPage.enterName(userData.signUpUserData.name);

await signupPage.enterEmail(userData.registerUserDate.InvailidEmail);

await signupPage.clickSignUpButton();

await signupPage.validateInvalidEmailMessage(userData.registerUserDate.InvalidEmailValidation)

})
