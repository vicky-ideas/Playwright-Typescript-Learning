import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";
import { expect } from "@playwright/test";



export class OrangePimPage extends BasePage {

    private readonly pimMenu = () => this.page.getByRole("link", { name: "PIM" });
    private readonly pimHeading = () => this.page.getByRole("heading", { name: "PIM" });
    private readonly addEmployeeButton = () => this.page.getByRole("button", { name: " Add" });
    private readonly employeeInformationHeading = () => this.page.getByRole("heading", { name: "Employee Information" })
    private readonly employeeIDSearchField = () => this.page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input')
    private readonly searchButton = () => this.page.getByRole("button", { name: "Search" })
    private readonly employeeNameSearchResult = (employeeName: string) => this.page.getByRole("cell", { name: employeeName })
    private readonly editButton = () => this.page.locator('[class="oxd-icon bi-pencil-fill"]');
    private readonly yesDeleteButton = () => this.page.getByRole("button", { name: ' Yes, Delete' });
    private readonly noRecordsFoundText = () => this.page.locator("//span[text()='No Records Found']");
    private readonly employeeRow = (employeeID: string) => this.page.locator(".oxd-table-body .oxd-table-row").filter({
        has: this.page.getByRole("cell", {
            name: employeeID,
            exact: true
        })
    });
    private readonly deleteButton = (employeeID: string) => this.employeeRow(employeeID).locator(".oxd-table-cell-actions").locator("button").filter({ has: this.page.locator(".bi-trash") });

    public async clickPimMenu(): Promise<void> {
        await this.click(this.pimMenu(), "PIM Menu");
    }

    public async verifyPimPageDisplayed(): Promise<void> {
        await this.isElementVisible(this.pimHeading(), "PIM Heading");
    }

    public async clickAddEmployeeButton(): Promise<void> {
        await this.click(this.addEmployeeButton(), "Add Employee Button");
    }

    public async verifyEmployeeInformationHeadingDisplayed(): Promise<void> {
        await this.isElementVisible(this.employeeInformationHeading(), "Employee Information")
    }

    public async enterEmployeeID(employeeID: string): Promise<void> {
        await this.fill(this.employeeIDSearchField(), employeeID, "EmployeeID search field")
    }

    public async clickSearchButton(): Promise<void> {
        await this.click(this.searchButton(), "Search Button")
    }

    public async verifySearchResult(employeeName: string): Promise<void> {
        await this.isElementVisible(this.employeeNameSearchResult(employeeName), "Employee Name search Result")
    }

    public async clickEditButton(): Promise<void> {
        await this.click(this.editButton(), "Edit Button")
    }

    public async clickDeleteButton(employeeID: string): Promise<void> {
        await this.click(this.deleteButton(employeeID), "Delete Button")
    }

    public async clickYesDelete(): Promise<void> {
        await this.click(this.yesDeleteButton(), "Yes, Delete")
    }

    public async deleteEmployee(employeeID: string, employeeName: string): Promise<void> {
        await this.enterEmployeeID(employeeID);
        await this.clickSearchButton();
        await this.verifySearchResult(employeeName);
        await this.isElementVisible(this.employeeNameSearchResult(employeeName), "Employee Name search Result");
        const row = this.employeeRow(employeeID);
        await expect(row).toHaveCount(1);
        await this.clickDeleteButton(employeeID);
        await this.clickYesDelete();
        await this.isElementVisible(this.noRecordsFoundText(), "No Records Found");
        logger.info("Newly Created Employee has been deleted successfully");
    }

}