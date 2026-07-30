import { expect ,Page } from "@playwright/test";
import { logger } from "../utils/logger";

export class BaseClass {
    constructor (protected page : Page){}

async click (locator:any, name:string){
    logger.info(`clicking ${name}`)
    await locator.click();
}

async isElementVisible(locator:any, name:string){
    logger.info(`${name} is Visible`)
    await expect(locator).toBeVisible();
}

async fill(locator:any,value:string, name:string){
    logger.info(`Filling ${name}`)
    await locator.fill(value);
}

async verifyValidationMessage(locator:any, name:string, expectedMessage:string) : Promise<void> {
    logger.info(`Verifying ${name}`)
   const actualMessage =  await locator.evaluate((element: HTMLInputElement) => {
       return element.validationMessage
    } )
    expect(actualMessage).toBe(expectedMessage)
}
    
}