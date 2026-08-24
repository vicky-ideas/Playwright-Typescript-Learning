import { test } from "../fixtures/fixtures";
import { userData } from "../test-data/signupData"; 
import { autoEmail } from "../utils/autoEmail";

test ("Task 2 - Register New user form", async({registerUserPage, signupPage, loginPage})=> {

const email = autoEmail.generateEmail();

await test.step("Open Signup Form", async () => {
    await signupPage.openSignupForm();
}
);

await test.step("Enter Signup Details", async () => {
    await signupPage.enterSignupDetails(userData.signUpUserData.name, email);
}
);

await signupPage.clickSignUpButton();

await test.step("Verify Password Validation Message", async () => {
    await registerUserPage.clickCreateAccountButton();
    await registerUserPage.verifyPasswordValidationMessage(userData.registerUserDate.PasswordValidation);
}
);

await test.step("Fill Account Details", async () => {
    await registerUserPage.fillAccountDetails(userData.registerUserDate.Password, userData.registerUserDate.FirstName, userData.registerUserDate.LastName, userData.registerUserDate.Address, userData.registerUserDate.State, userData.registerUserDate.City, userData.registerUserDate.ZipCode, userData.registerUserDate.MobileNumber);
}
);

await test.step("Create Account", async () => {
    await registerUserPage.clickCreateAccountButton();

    await registerUserPage.validateAccountCreatedMessage();

    await registerUserPage.clickContinueButton();
}
);

await test.step("Logout", async () => {
    await registerUserPage.clickLogout();
}
);

await test.step("Login with newly created user", async () => {
    await loginPage.login(email, userData.registerUserDate.Password);
}
);

await test.step("Logout after successful login", async () => {
    await registerUserPage.clickLogout();
}
);

})