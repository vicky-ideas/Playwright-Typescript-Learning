import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";



export class OrangeAddEmployeePage extends BasePage {

    private readonly addEmployeeHeading = () => this.page.getByRole("heading", { name: "Add Employee" });
    private readonly firstNameInput = () => this.page.getByRole("textbox", { name: "First Name" });
    private readonly middleNameInput = () => this.page.getByRole("textbox", { name: "Middle Name" });
    private readonly lastNameInput = () => this.page.getByRole("textbox", { name: "Last Name" });
    //private readonly employeeIdInput = () => this.page.getByLabel("label", { name: "Employee Id" });
    private readonly employeeIdInput = () => this.page.locator('.oxd-input-group').filter({
    has: this.page.getByText('Employee Id', { exact: true }),
    }).getByRole('textbox');
    private readonly saveButton = () => this.page.getByRole("button", { name: "Save" });

    public async verifyAddEmployeePageDisplayed(): Promise<void> {
        await this.isElementVisible(this.addEmployeeHeading(), "Add Employee");
    }

    public async fillEmployeeDetails(firstName: string, middleName: string, lastName: string, EmployeeID: string): Promise<void> {
        await this.fill(this.firstNameInput(), firstName, "First Name");
        await this.fill(this.middleNameInput(), middleName, "Middle Name");
        await this.fill(this.lastNameInput(), lastName, "Last Name");
        await this.fill(this.employeeIdInput(), EmployeeID, "Employee ID");
    }

    public async uploadProfilePicture(filePath: string): Promise<void> {
        const fileInput = this.page.locator('input[class="oxd-file-input"]');
        await fileInput.setInputFiles(filePath);
        logger.info("Uploaded profile picture");
    }

    public async submitEmployeeForm(): Promise<void> {
        await this.saveButton().click();
        logger.info("Submitted the add employee form");
    }

    public async getEmpId(): Promise<string> {
        const empID = await this.employeeIdInput().inputValue();
        return empID;
    }

}