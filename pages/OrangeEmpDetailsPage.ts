import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";


export class OrangeEmpDetailsPage extends BasePage {


    private readonly empDetailsHeading = () => this.page.getByRole("heading", { name: "Personal Details" });
    private readonly empIDvalue = () => this.page.locator('.oxd-input-group').filter({hasText: 'Employee Id'}).locator('input')
    private readonly employeeList = () => this.page.getByRole("link",{name:"Employee List"});
    private readonly genderCheck = (gendervalue: string) => this.page.getByRole("radio",{name:gendervalue, exact: true }).locator('..').locator('span.oxd-radio-input');
    private readonly driversLicenseNumberInput = () => this.page.locator('.oxd-input-group').filter({hasText: "Driver's License Number"}).locator('input')
    private readonly nationalityClick = () => this.page.locator('.oxd-input-group').filter({hasText:"Nationality"}).getByText("-- Select --")
    private readonly nationalityValueSelect = (nationalityValue: string) => this.page.getByText(nationalityValue, { exact: true })
    private readonly ValidateNationalityValue = (nationalityValue: string) => this.page.locator('.oxd-input-group').filter({hasText:"Nationality"}).getByText(nationalityValue)
    private readonly maritalStatusClick = () => this.page.locator('.oxd-input-group').filter({hasText:"Marital Status"}).getByText("-- Select --")
    private readonly maritalStausValueSelect = (maritalStatusValue: string) => this.page.getByText(maritalStatusValue, { exact: true })
    private readonly validateMaritalStatusValue = (maritalStatusValue: string) => this.page.locator('.oxd-input-group').filter({hasText:"Marital Status"}).getByText(maritalStatusValue)
    private readonly saveButton = () => this.page.locator("(//button[text()=' Save '])[1]")


    public async verifyEmpDetailsPageDisplayed(): Promise<void> {
        await this.isElementVisible(this.empDetailsHeading(), "Personal Details");
    }

    public async getEmployeeID(): Promise<string> {
        const empID = await this.empIDvalue();
        return await empID.inputValue();
    }

    public async clickEmployeeList(): Promise<void> {
        await this.click(this.employeeList(),"Employee List")
    }

    public async fillGender(gendervalue: string): Promise<void> {
        await this.genderCheck(gendervalue).click();
        logger.info("Checking Gender Value")
    }

    public async fillLicenseNumber(LicenseNumberValue: string): Promise<void> {
        await this.fill(this.driversLicenseNumberInput(),LicenseNumberValue,"License Number")
    }

    public async fillNationality(nationalityValue: string): Promise<void> {
        await this.click(this.nationalityClick(),"Nationality Dropdown");
        await this.click(this.nationalityValueSelect(nationalityValue),"Nationality Value")
    }

    public async fillMaritalStatus(maritalStatusValue: string): Promise<void> {
        await this.click(this.maritalStatusClick(),"Marital Status Dropdown")
        await this.click(this.maritalStausValueSelect(maritalStatusValue),"Marital Status Value")
    }

    public async clickSaveButton(): Promise<void> {
        await this.click(this.saveButton(),"Save Button")
    }

    public async updateEmployeeDetails(nationalityValue: string, maritalStatusValue: string, gendervalue: string, LicenseNumberValue: string): Promise<void> {
        await this.fillNationality(nationalityValue);
        await this.fillMaritalStatus(maritalStatusValue);
        await this.fillLicenseNumber(LicenseNumberValue);
        await this.fillGender(gendervalue);
        await this.clickSaveButton();
    }

    public async validateUpdatedDetails(maritalStatusValue: string,nationalityValue: string): Promise<void> {
        await this.isElementVisible(this.validateMaritalStatusValue(maritalStatusValue),"Updated Marital status value")
        await this.isElementVisible(this.ValidateNationalityValue(nationalityValue),"Updated Nationality value")
    }

}