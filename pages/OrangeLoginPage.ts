import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";       


export class OrangeLoginPage extends BasePage {

    private readonly usernameInput = () => this.page.getByRole("textbox", { name: "Username" });
    private readonly passwordInput = () => this.page.getByRole("textbox", { name: "Password" });
    private readonly loginButton = () => this.page.getByRole("button", { name: "Login" });
    private readonly dashboardElement = () => this.page.getByRole("heading", { name: "Dashboard" });
    private readonly userprofileMenu = () => this.page.locator('.oxd-userdropdown');
    private readonly logout = () => this.page.getByRole("menuitem",{name:"Logout"});


    public async navigate(url: string): Promise<void> {
        await this.page.goto(url);
        logger.info(`Navigated to URL: ${url}`);
    }

    public async enterUsername(username: string): Promise<void> {
        await this.usernameInput().fill(username);
        logger.info("Entered username");
    }

    public async enterPassword(password: string): Promise<void> {
        await this.passwordInput().fill(password);
        logger.info("Entered password");
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton().click();
        logger.info("Clicked on login button");
    }

    public async clickUserProfilemenu(): Promise<void> {
        await this.click(this.userprofileMenu(),"User profile menu")
    }

    public async clickLogout(): Promise<void> {
        await this.click(this.logout(),"Logout")
    }

    public async verifyLoginPageDisplayed(): Promise<void> {
        await expect(this.usernameInput()).toBeVisible();
        await expect(this.passwordInput()).toBeVisible();
        await expect(this.loginButton()).toBeVisible();
        logger.info("Verified that the login page is displayed");
    }

    public async logintoOrangeHRM(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
        logger.info(`Logged in with username: ${username}`);
    }

    public async verifySuccessfulLogin(): Promise<void> {
        await this.isElementVisible(this.dashboardElement(),"Dashboard Heading after login");
    }

    public async logoutUser(): Promise<void> {
        await this.clickUserProfilemenu();
        await this.clickLogout();
    }

}