import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

private readonly emailAddressTextBox = () =>
    this.page.locator('[data-qa="login-email"]');

 private readonly passwordTextBox = () => 
    this.page.locator('[data-qa="login-password"]');

 private readonly loginButton = () =>
    this.page.locator('[data-qa="login-button"]')

 private readonly InvalidEmailorPasswordMessage = () =>
    this.page.getByText("Your email or password is incorrect!")

public async fillEmail(email:string): Promise<void>{
    await this.fill(this.emailAddressTextBox(),email,"Email Field")
 }

 public async fillPassword(password:string): Promise<void>{
    await this.fill(this.passwordTextBox(),password,"Password Field")
 }

 public async clickLoginButton(): Promise<void>{
    await this.click(this.loginButton(),"Login Button")
 }

 public async validateEmailField(message:string): Promise<void>{
    await this.verifyValidationMessage(this.emailAddressTextBox(),"Email Field Message",message)
 }

 public async validatePasswordField(message:string): Promise<void>{
    await this.verifyValidationMessage(this.passwordTextBox(),"Password Field Message",message)
 }

public async incorrectEmailOrPasswordMessageCheck(): Promise<void>{
    await this.isElementVisible(this.InvalidEmailorPasswordMessage(),"Email or Password is Incorrect Message")
}

public async login(email:string, password:string): Promise<void>{
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton(); 
}

public async validateEmptyEmailFieldValidation(password:string,message:string): Promise<void>{

    await this.fillPassword(password);

    await this.clickLoginButton();

    await  this.validateEmailField(message);
}

public async validateEmptyPasswordFieldValidation(email:string,message:string): Promise<void>{

    await this.fillEmail(email);

    await this.clickLoginButton();

    await  this.validatePasswordField(message);

}

}