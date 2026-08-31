import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";



export class OrangePimPage extends BasePage {

    private readonly pimMenu = () => this.page.getByRole("link", { name: "PIM" });
    private readonly pimHeading = () => this.page.getByRole("heading", { name: "PIM" });
    private readonly addEmployeeButton = () => this.page.getByRole("button", { name: " Add" });
    private readonly employeeInformationHeading = () => this.page.getByRole("heading", {name: "Employee Information"})
    private readonly employeeIdSearchField = () => this.page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input')
    private readonly searchButton = () => this.page.getByRole("button", {name: "Search"})
    private readonly firstNameSearchResult = (firstName: string) => this.page.getByRole("cell", {name: firstName})
    private readonly editButton = () => this.page.locator('[class="oxd-icon bi-pencil-fill"]')
    private readonly deleteButton = () => this.page.locator('[class="oxd-icon bi-trash"]');
    private readonly yesDeleteButton = () => this.page.getByRole("button",{name:' Yes, Delete'});
    private readonly noRecordsFoundText = () => this.page.locator("//span[text()='No Records Found']");

    public async clickPimMenu(): Promise<void> {
        await this.pimMenu().click();
        logger.info("Clicked on PIM menu");
    }

    public async verifyPimPageDisplayed(): Promise<void> {
        await this.isElementVisible(this.pimHeading(), "PIM Heading");
    }

    public async clickAddEmployeeButton(): Promise<void> {
        await this.addEmployeeButton().click();
        logger.info("Clicked on Add Employee button");
    }

    public async verifyEmployeeInformationHeadingDisplayed(): Promise<void> {
        await this.isElementVisible(this.employeeInformationHeading(),"Employee Information")
    }

    public async enterEmployeeID (empID: string): Promise<void> {
        await this.fill(this.employeeIdSearchField(), empID, "EmployeeID search field")
    }

    public async clickSearcButton(): Promise<void> {
        await this.click(this.searchButton(), "Search Button")
    }

    public async verifySearchResult(firstName: string): Promise<void> {
        await this.isElementVisible(this.firstNameSearchResult(firstName), "First Name search Result")
    }

    public async clickEditButton() : Promise<void> {
        await this.click(this.editButton(), "Edit Button")
    }

    public async clickDeleteButton(): Promise<void> {
        await this.click(this.deleteButton(), "Delete Button")
    }

    public async clickYesDelete(): Promise<void> {
        await this.click(this.yesDeleteButton(), "Yes, Delete")
    }

    public async deleteEmployee(empID:string, firstName: string): Promise<void> {
        await this.enterEmployeeID(empID);
        await this.clickSearcButton();
        await this.verifySearchResult(firstName);
        await this.isElementVisible(this.firstNameSearchResult(firstName),"First Name search Result");
        await this.clickDeleteButton();
        await this.clickYesDelete();
        await this.isElementVisible(this.noRecordsFoundText(),"No Records Found");
    }

}