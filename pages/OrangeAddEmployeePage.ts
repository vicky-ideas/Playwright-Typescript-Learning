import { BasePage } from "./BasePage";

type EmployeeData = {
        firstName: string;
        middleName: string;
        lastName: string;
        employeeId: string;
    };


export class OrangeAddEmployeePage extends BasePage {

    private readonly addEmployeeHeading = () => this.page.getByRole("heading", { name: "Add Employee" });
    private readonly firstNameInput = () => this.page.getByRole("textbox", { name: "First Name" });
    private readonly middleNameInput = () => this.page.getByRole("textbox", { name: "Middle Name" });
    private readonly lastNameInput = () => this.page.getByRole("textbox", { name: "Last Name" });
    private readonly employeeIdInput = () => this.page.locator('.oxd-input-group').filter({
    has: this.page.getByText('Employee Id', { exact: true }),
    }).getByRole('textbox');
    private readonly saveButton = () => this.page.getByRole("button", { name: "Save" });

    public async verifyAddEmployeePageDisplayed(): Promise<void> {
        await this.isElementVisible(this.addEmployeeHeading(), "Add Employee");
    }

    public async fillEmployeeDetails(employeeData: EmployeeData): Promise<void> {
        await this.fill(this.firstNameInput(), employeeData.firstName, "First Name");
        await this.fill(this.middleNameInput(), employeeData.middleName, "Middle Name");
        await this.fill(this.lastNameInput(), employeeData.lastName, "Last Name");
        await this.fill(this.employeeIdInput(), employeeData.employeeId, "Employee ID");
    }

    public async uploadProfilePicture(filePath: string): Promise<void> {
        const fileInput = this.page.locator('input[class="oxd-file-input"]');
        await fileInput.setInputFiles(filePath);
    }

    public async submitEmployeeForm(): Promise<void> {
        await this.saveButton().click();
    }

    public async getEmpId(): Promise<string> {
        const empID = await this.employeeIdInput().inputValue();
        return empID;
    }

}