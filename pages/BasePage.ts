import { expect ,Locator,Page } from "@playwright/test";
import { logger } from "../utils/logger";

export class BasePage {
    constructor (protected page : Page){}

async click (locator:Locator, name:string) : Promise<void>{
    logger.info(`Clicking on ${name}`);
    await locator.click();
}

async isElementVisible(locator:Locator, name:string) : Promise<void>{
    logger.info(`Verifying ${name}`);
    await expect(locator).toBeVisible();
}

async fill(locator:Locator,value:string, name:string) : Promise<void>{
    logger.info(`Entering value in ${name}`);
    await locator.fill(value);
}

async reloadpage(){
    await this.page.reload();
}

async verifyValidationMessage(locator:Locator, name:string, expectedMessage:string) : Promise<void> {
   const actualMessage =  await locator.evaluate((element: HTMLInputElement) => {
       return element.validationMessage
    } )
    logger.info(`Verifying ${name}`)
    expect(actualMessage).toBe(expectedMessage)
}

async isPageClosed(): Promise<boolean> {
       return this.page.isClosed();
  }
    
}