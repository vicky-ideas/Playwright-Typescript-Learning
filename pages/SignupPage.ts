import { expect, Page } from "@playwright/test";
import { autoEmail } from "../utils/autoEmail";
import { BaseClass } from "./BasePage";

export class SignupPage extends BaseClass {

 private readonly signupLoginLink = 
 () => this.page.getByRole ("link" , {name: " Signup / Login"});

 private readonly signupHeading = 
 () => this.page.getByText ("New User Signup!");

 private readonly nameTextBox =
 () => this.page.getByPlaceholder("Name");

 private readonly emailTextBox =
 () => this.page.locator('[data-qa = "signup-email"]');

 private readonly signUpButton = 
 () => this.page.locator('[data-qa = "signup-button"]')

 public async navigate(url : string): Promise<void> {
    await this.page.goto(url)
 }

public async clickSignUpLogin(): Promise<void> {
  await  this.click(this.signupLoginLink(),"Signup Link")
}

public async verifySignUpFormVisible(): Promise<void>{
  await  this.isElementVisible(this.signupHeading(),"Signup Form")
}

public async enterName(name: string): Promise<void> {
   await this.fill(this.nameTextBox(),name,"Name Field")
}

public async enterEmail(email:string): Promise<void> {
   await this.fill(this.emailTextBox(),email,"Email Field")
}

public async clickSignUpButton(): Promise<void> {
  await  this.click(this.signUpButton(),"Signup Button")
}

public async validateNameValidation(message:string): Promise<void> {
  await  this.verifyValidationMessage(this.nameTextBox(),"Name Field Validation",message);
}

public async validateInvalidEmailMessage(message:string): Promise<void> {
  await  this.verifyValidationMessage(this.emailTextBox(),"Invalid Email Field Validation Message",message);
}

}
