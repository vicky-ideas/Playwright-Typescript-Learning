import { expect ,Locator,Page } from "@playwright/test";
import { logger } from "../utils/logger";

export class BasePage {
    constructor (protected page : Page){}

async click (locator:Locator, name:string) : Promise<void>{
    await locator.click();
    logger.info(`clicking ${name}`)
}

async isElementVisible(locator:Locator, name:string) : Promise<void>{
    await expect(locator).toBeVisible({timeout:120000});
    logger.info(`${name} is Visible`)

}

async fill(locator:Locator,value:string, name:string) : Promise<void>{
    await locator.fill(value);
    logger.info(`Filling ${name}`)
}

async reloadpage(){
    await this.page.reload();
}

async verifyValidationMessage(locator:Locator, name:string, expectedMessage:string) : Promise<void> {
   const actualMessage =  await locator.evaluate((element: HTMLInputElement) => {
       return element.validationMessage
    } )
    expect(actualMessage).toBe(expectedMessage)
    logger.info(`Verifying ${name}`)
}
    
}