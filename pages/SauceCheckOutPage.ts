import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";

export class SauceDemoCheckOutPage extends BasePage {
  private readonly firstNameInput = () =>
    this.page.getByRole("textbox", {
      name: "First Name",
    });

  private readonly lastNameInput = () =>
    this.page.getByRole("textbox", {
      name: "Last Name",
    });

  private readonly postalCodeInput = () =>
    this.page.getByRole("textbox", {
      name: "Zip/Postal Code",
    });

  private readonly continueButton = () =>
    this.page.getByRole("button", {
      name: "Continue",
    });

  private readonly finishButton = () =>
    this.page.getByRole("button", {
      name: "Finish",
    });

  private readonly confirmationMessage = () =>
    this.page.getByText("Thank you for your order!");

  private readonly logoutButton = () =>
    this.page.getByRole("link", {
      name: "Logout",
    });

  private readonly menuButton = () =>
    this.page.getByRole("button", {
      name: "Open Menu",
    });

  public async enterCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.postalCodeInput().fill(postalCode);

    await logger.info("Customer information entered");
  }

  public async clickContinue(): Promise<void> {
    await this.continueButton().click();

    await logger.info("Checkout information submitted");
  }

  public async clickFinish(): Promise<void> {
    await this.finishButton().click();

    await logger.info("Order completed");
  }

  public async verifyOrderConfirmation(): Promise<void> {
    await expect(this.confirmationMessage()).toBeVisible();

    await logger.info("Order confirmation message verified");
  }

  public async logout(): Promise<void> {
    await this.menuButton().click();
    await this.logoutButton().click();
  }
}
