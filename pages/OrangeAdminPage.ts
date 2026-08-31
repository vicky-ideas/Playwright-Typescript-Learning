import { BasePage } from "./BasePage";



export class OrangeAdminPage extends BasePage {

    private readonly adminmenu = () => this.page.getByRole("link", { name: "Admin" });
    private readonly systemUsersHeading = () => this.page.getByRole("heading", {name: "System Users"});
    private readonly searchButton = () => this.page.getByRole("button",{name: " Search "});
    private readonly addUserButton = () => this.page.getByRole("button", { name: " Add " });
    private readonly addUserHeading = () => this.page.getByRole("heading", {name: "Add User"});
    private readonly userRoleClick = () => this.page.locator('.oxd-input-group').filter({hasText:"User Role"}).getByText("-- Select --");
    private readonly userRoleValueSelect = (userRoleValue: string) => this.page.getByRole("listbox").getByText(userRoleValue, { exact: true });
    private readonly EmployeeNameTextBox = () => this.page.getByPlaceholder("Type for hints...");
    private readonly EmployeeNameSearchResult = (employeeName: string) => this.page.locator('.oxd-autocomplete-option').filter({ hasText: employeeName });
    private readonly statusClick = () => this.page.locator('.oxd-input-group').filter({hasText:"Status"}).getByText("-- Select --");
    private readonly statusValueSelect = (statusValue: string) => this.page.getByRole("listbox").getByText(statusValue, { exact: true });
    private readonly userNameInput = () => this.page.locator('.oxd-input-group').filter({hasText: "Username"}).locator('input');
    private readonly passwordInput = () => this.page.locator('.oxd-input-group').filter({hasText: /^Password$/}).locator('input');
    private readonly confirmPasswordInput = () => this.page.locator('.oxd-input-group').filter({hasText: /^Confirm Password$/}).locator('input');
    private readonly saveButton = () => this.page.getByRole("button", {name:" Save "});
    private readonly usernameSearchResult = (username: string) => this.page.getByRole("cell", {name: username, exact: true});
    private readonly deleteButton = () => this.page.locator('[class="oxd-icon bi-trash"]');
    private readonly yesDeleteButton = () => this.page.getByRole("button",{name:' Yes, Delete'});
    private readonly noRecordsFoundText = () => this.page.locator("//span[text()='No Records Found']");



    public async clickAdminMenu(): Promise<void> {
        await this.click(this.adminmenu(), "Admin Menu")
    }

    public async validateSystemUsersHeading(): Promise<void> {
        await this.isElementVisible(this.systemUsersHeading(),"System Users heading")
    }

    public async clickAddUserButton(): Promise<void> {
        await this.click(this.addUserButton(), "Add User Button")
    }

    public async validateAddUserHeading(): Promise<void> {
        await this.isElementVisible(this.addUserHeading(),"Add User Heading")
    } 

    public async selectUserRole(userRoleValue: string): Promise<void> {
        await this.click(this.userRoleClick(),"User Role Dropdown")
        await this.click(this.userRoleValueSelect(userRoleValue),"User Role Dropdown Value")
    }

    public async fillEmployeeName (employeeNameValue: string):Promise<void> {
        await this.fill(this.EmployeeNameTextBox(),employeeNameValue,"Employee Name")
        await this.click(this.EmployeeNameSearchResult(employeeNameValue),"Employee Name result")
    }

    public async selectStatus(statusValue: string): Promise<void> {
        await this.click(this.statusClick(), " Status Dropdown");
        await this.click(this.statusValueSelect(statusValue),"Status Dropdown Value")
    }

    public async fillUserName(userNameValue: string): Promise<void> {
        await this.fill(this.userNameInput(),userNameValue,"User Name ")
    }

    public async fillPassword(passwordValue: string): Promise<void> {
        await this.fill(this.passwordInput(),passwordValue,"Password ")
    }

    public async fillConfirmPassword(confirmPasswordValue: string): Promise<void> {
        await this.fill(this.confirmPasswordInput(),confirmPasswordValue,"Confirm Password ")
    }

    public async clickSaveButton(): Promise<void> {
        await this.click(this.saveButton(),"Save Button");
    }

    public async addNewSystemUser(userRoleValue: string, employeeNameValue: string, statusValue: string, userNameValue: string, passwordValue: string, confirmPasswordValue: string): Promise<void> {
        await this.clickAdminMenu();
        await this.validateSystemUsersHeading();
        await this.clickAddUserButton();
        await this.validateAddUserHeading();
        await this.selectUserRole(userRoleValue);
        await this.fillEmployeeName(employeeNameValue);
        await this.selectStatus(statusValue);
        await this.fillUserName(userNameValue);
        await this.fillPassword(passwordValue);
        await this.fillConfirmPassword(confirmPasswordValue);
        await this.clickSaveButton();
        await this.isElementVisible(this.systemUsersHeading(), "System User Heading");
    }

    public async validateNewAdminUser(userNameValue: string): Promise<void> {
        await this.fill(this.userNameInput(),userNameValue,"User Name field");
        await this.click(this.searchButton(), "Search button");
        await this.isElementVisible(this.usernameSearchResult(userNameValue),"Username Search Result")
    }

    public async deleteAdminUser(userNameValue: string): Promise<void> {
        await this.clickAdminMenu();
        await this.validateSystemUsersHeading();
        await this.fill(this.userNameInput(),userNameValue, "User Name Field");
        await this.click(this.searchButton(), "Search button");
        await this.isElementVisible(this.usernameSearchResult(userNameValue),"Username Search Result");
        await this.click(this.deleteButton(),"Delete Button");
        await this.click(this.yesDeleteButton(),"Yes, delete Button");
        await this.isElementVisible(this.noRecordsFoundText(),"No records Found");
    }


}