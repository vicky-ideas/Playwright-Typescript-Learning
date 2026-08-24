import { expect ,Locator,Page } from "@playwright/test";
import { logger } from "../utils/logger";

export class BasePage {
    constructor (protected page : Page){}

async click (locator:Locator, name:string) : Promise<void>{
    logger.info(`clicking ${name}`)
    await locator.click();
}

async isElementVisible(locator:Locator, name:string) : Promise<void>{
    logger.info(`${name} is Visible`)
    await expect(locator).toBeVisible();
}

async fill(locator:Locator,value:string, name:string) : Promise<void>{
    logger.info(`Filling ${name}`)
    await locator.fill(value);
}

async reloadpage(){
    await this.page.reload();
}

async verifyValidationMessage(locator:Locator, name:string, expectedMessage:string) : Promise<void> {
    logger.info(`Verifying ${name}`)
   const actualMessage =  await locator.evaluate((element: HTMLInputElement) => {
       return element.validationMessage
    } )
    expect(actualMessage).toBe(expectedMessage)
}
    
}