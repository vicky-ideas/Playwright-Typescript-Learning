import { expect } from "@playwright/test";
import { BaseClass } from "./BasePage";
import { logger } from "../utils/logger";

export class SauceDemoLoginPage extends BaseClass {
  private readonly usernameInput = () =>
    this.page.getByRole("textbox", { name: "Username" });

  private readonly passwordInput = () =>
    this.page.getByRole("textbox", {
      name: "Password",
    });

  private readonly loginButton = () =>
    this.page.getByRole("button", {
      name: "Login",
    });

  private readonly loginPageContainer = () =>
    this.page.locator(".login_container");

  public async navigate(url: string): Promise<void> {
    await this.page.goto(url);

    await logger.info("Navigated to SauceDemo login page");
  }

  public async login(username: string, password: string): Promise<void> {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();

    await logger.info(`Logged in as ${username}`);
  }

  public async verifyLoginPageDisplayed(): Promise<void> {
    await expect(this.loginPageContainer()).toBeVisible();

    await logger.info("Login page is displayed");
  }
}
