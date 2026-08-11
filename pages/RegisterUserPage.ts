import { expect, Page } from "@playwright/test";
import { BaseClass } from "./BasePage";

export class RegisterUserPage extends BaseClass{

 private readonly createAccountButton = () =>
    this.page.getByText ("Create Account");

 private readonly passwordTextBox = () => 
    this.page.locator('[data-qa="password"]')

 private readonly title = () =>
    this.page.locator('[value="Mr"]')

 private readonly firstnameTextBox = 
 () => this.page.locator('[data-qa="first_name"]')

 private readonly lastnameTextBox = 
 () => this.page.locator('[data-qa="last_name"]')

  private readonly address1TextBox = 
 () => this.page.locator('[data-qa="address"]')

 private readonly stateTextBox = 
 () => this.page.locator('[data-qa="state"]')

 private readonly cityTextBox = 
 () => this.page.locator('[data-qa="city"]')

  private readonly zipcodeTextBox = 
 () => this.page.locator('[data-qa="zipcode"]')

  private readonly mobilenumberTextBox = 
 () => this.page.locator('[data-qa="mobile_number"]')

 private readonly accountCreatedText = 
 () => this.page.getByText('Account Created!')

 private readonly continueButton = 
 () => this.page.locator('[data-qa="continue-button"]')

 private readonly logout =
 () => this.page.getByText(' Logout')

 public async clickCreateAccountButton (): Promise<void> {
   await this.click(this.createAccountButton(),"Create Account")
 }

 public async verifyPasswordValidationMessage (message:string): Promise<void> {
   await this.verifyValidationMessage(this.passwordTextBox(),"Password Field validation message",message)
 }

 public async fillpassword(password:string): Promise<void>{
    await this.fill(this.passwordTextBox(),password,"Password Field")
 }

 public async fillFirstName(firstname:string): Promise<void>{
    await this.fill(this.firstnameTextBox(),firstname,"Firstname Field")
 }

 public async fillLastName(lastname:string): Promise<void>{
    await this.fill(this.lastnameTextBox(),lastname,"Lastname Field")
 }

 public async fillAddress(address:string): Promise<void>{
    await this.fill(this.address1TextBox(),address,"Address Field")
 }

 public async fillState(state:string): Promise<void>{
    await this.fill(this.stateTextBox(),state,"State Field")
 }

 public async fillCity(city:string): Promise<void>{
    await this.fill(this.cityTextBox(),city,"City Field")
 }

 public async fillZipCode(zipcode:string): Promise<void>{
    await this.fill(this.zipcodeTextBox(),zipcode,"ZipCode Field")
 }

 public async fillMobileNumber(mobilenumber:string): Promise<void>{
    await this.fill(this.mobilenumberTextBox(),mobilenumber,"MobileNumber Field")
 }

public async validateAccountCreatedMessage(): Promise<void>{
    await this.isElementVisible(this.accountCreatedText(),"Account Created Message")
 }

public async clickContinueButton(): Promise<void> {
   await this.click(this.continueButton(),"Continue Button")
 }

 public async clickLogout(): Promise<void> {
   await this.click(this.logout(),"Logout")
 }

 public async fillAccountDetails(password:string, firstname:string, lastname:string, address:string, state:string, city:string, zipcode:string, mobilenumber:string): Promise<void> {
    await this.fillpassword(password);
    await this.fillFirstName(firstname);
    await this.fillLastName(lastname);
    await this.fillAddress(address);
    await this.fillState(state);
    await this.fillCity(city);
    await this.fillZipCode(zipcode);
    await this.fillMobileNumber(mobilenumber);
 }

}