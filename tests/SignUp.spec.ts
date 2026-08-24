import {test} from "../fixtures/fixtures";
import {userData} from "../test-data/signupData";
import { autoEmail } from "../utils/autoEmail";

test.beforeEach(async({signupPage}) => {

await signupPage.openSignupForm();

});

test ("Task 1 - verify signup form", async({signupPage})=> {
const email = autoEmail.generateEmail();

await signupPage.enterSignupDetails(userData.signUpUserData.name, email);

})

test("Task 3 - case 1 - Empty Field Validation Check", async({signupPage}) => {

await signupPage.validateEmptyNameFieldValidation(userData.registerUserDate.PasswordValidation);

})

test("Task 3 - case 2 - Ivalid email format validation Check", async({signupPage}) => {

await signupPage.validateInvalidEmailFormatValidation(userData.signUpUserData.name,userData.registerUserDate.InvailidEmail,userData.registerUserDate.InvalidEmailValidation);

})
