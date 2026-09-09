import { logger } from "../utils/logger";
import { BasePage } from "./BasePage";

export class OrangeLeavePage extends BasePage {

    private readonly leavemenu = () => this.page.getByRole("link", { name: "Leave", exact: true });
    private readonly leaveListMenu = () => this.page.getByRole("link", { name: "Leave List" });
    private readonly myLeaveMenu = () => this.page.getByRole("link", { name: "My Leave" });
    private readonly applyMenu = () => this.page.getByRole("link", { name: "Apply" });
    private readonly employeeNameInput = () => this.page.locator('.oxd-input-group').filter({hasText:"Employee Name"}).locator('input');
    private readonly searchButton = () => this.page.getByRole("button",{name: " Search "});
    private readonly resultEmployeeNameCell = (employeeName: string) => this.page.getByRole("cell", {name: employeeName});
    private readonly resultLeaveTypeCell = (leaveType: string) => this.page.getByRole("cell", {name: leaveType});
    private readonly applyLeaveHeading = () => this.page.getByRole("heading", {name: "Apply Leave"});
    private readonly leaveTypeClick = () => this.page.locator('.oxd-input-group').filter({hasText:"Leave Type"}).getByText("-- Select --");
    private readonly leaveTypeValueSelect = (leaveTypeValue: string) => this.page.getByRole("listbox").getByText(leaveTypeValue, { exact: true });
    private readonly fromDateInput = () => this.page.locator('.oxd-input-group').filter({hasText:"From Date"}).locator('input');
    private readonly commentInput = () => this.page.locator('.oxd-textarea');
    private readonly applyButton = () => this.page.getByRole("button", {name:" Apply "});
    private readonly leaveListHeading = () => this.page.getByRole("heading", {name: "Leave List"});
    private readonly leaveStatusCell = (leaveStatus: string) => this.page.getByRole("cell", {name: leaveStatus});
    private readonly approveButton = () => this.page.getByRole("button", {name:" Approve "});
    private readonly entitlementMenu = () => this.page.getByText("Entitlements ", { exact: true });
    private readonly addEntitlementsMenu = () => this.page.getByRole("menuitem", { name: "Add Entitlements"});
    private readonly entitlementEmployeeNameInput = () => this.page.locator('.oxd-input-group').filter({hasText:"Employee Name"}).locator('input');
    private readonly entitlementEmployeeNameSearchResult = (employeeName: string) => this.page.locator('.oxd-autocomplete-option').filter({ hasText: employeeName });
    private readonly entitlementLeaveTypeClick = () => this.page.locator('.oxd-input-group').filter({hasText:"Leave Type"}).getByText("-- Select --");
    private readonly entitlementLeaveTypeValueSelect = (leaveTypeValue: string) => this.page.getByRole("listbox").getByText(leaveTypeValue, { exact: true });
    private readonly entitlementEntitlementInput = () => this.page.locator('.oxd-input-group').filter({hasText:"Entitlement"}).locator('input');
    private readonly entitlementSaveButton = () => this.page.getByRole("button", {name:" Save "});
    private readonly confirmEntitlementButton = () => this.page.getByRole("button",{name:' Confirm '});
    private readonly toastMessage = (message: string) => this.page.locator(".oxd-toast").filter({ hasText: message });



    public async clickLeaveMenu(): Promise<void> {
        await this.click(this.leavemenu(), "Leave Menu")
    }

    public async verifyApplyLeavePageDisplayed(): Promise<void> {
        await this.isElementVisible(this.applyLeaveHeading(),"Apply Leave Heading")
    }

    public async selectLeaveType(leaveTypeValue: string): Promise<void> {
        await this.click(this.leaveTypeClick(),"Leave Type Dropdown")
        await this.click(this.leaveTypeValueSelect(leaveTypeValue),"Leave Type Dropdown Value")
    }

    public async fillFromDate(fromDateValue: string): Promise<void> {
        await this.fill(this.fromDateInput(),fromDateValue,"From Date")
    }

    public async fillComment(commentValue: string): Promise<void> {
        await this.fill(this.commentInput(),commentValue,"Comment")
    }

    public async clickApplyButton(): Promise<void> {
        await this.click(this.applyButton(),"Apply Button")
    }

    public async verifyLeaveListPageDisplayed(): Promise<void> {
        await this.isElementVisible(this.leaveListHeading(),"Leave List Heading")
    }

    public async verifyLeaveStatus(leaveStatus: string): Promise<void> {
        await this.isElementVisible(this.leaveStatusCell(leaveStatus),`Leave Status ${leaveStatus}`)
    }
    
    public async clickApproveButton(): Promise<void> {
        await this.click(this.approveButton(),"Approve Button")
    }

    public async clickEntitlementMenu(): Promise<void> {
        await this.click(this.entitlementMenu(), "Entitlement Menu")
    }

    public async clickAddEntitlementsMenu(): Promise<void> {
        await this.click(this.addEntitlementsMenu(), "Add Entitlements Menu")
    }

    public async addEntitlement(employeeName: string, leaveTypeValue: string, entitlementValue: string): Promise<void> {
        await this.clickLeaveMenu();
        await this.clickEntitlementMenu();
        await this.clickAddEntitlementsMenu();
        await this.fill(this.entitlementEmployeeNameInput(),employeeName,"Employee Name");
        await this.click(this.entitlementEmployeeNameSearchResult(employeeName),"Employee Name result");
        await this.click(this.entitlementLeaveTypeClick(),"Leave Type Dropdown");
        await this.click(this.entitlementLeaveTypeValueSelect(leaveTypeValue),"Leave Type Dropdown Value");
        await this.fill(this.entitlementEntitlementInput(),entitlementValue,"Entitlement");
        await this.click(this.entitlementSaveButton(),"Save Button");
        await this.click(this.confirmEntitlementButton(),"Confirm Entitlement Button");
        logger.info("Entitlement added successfully");
    }

    public async applyLeave(leaveTypeValue: string, fromDateValue: string, commentValue: string): Promise<void> {
        await this.leavemenu().click();
        await this.applyMenu().click();
        await this.verifyApplyLeavePageDisplayed();
        await this.selectLeaveType(leaveTypeValue);
        await this.fillFromDate(fromDateValue);
        await this.fillComment(commentValue);
        await this.clickApplyButton();
        await this.isElementVisible(this.toastMessage("Successfully Saved"),"Leave Applied Toast Message");
        logger.info("Leave applied successfully");
    }

    public async validateLeaveRequest(employeeName: string, leaveType: string): Promise<void> {
        await this.myLeaveMenu().click();
        await this.verifyLeaveListPageDisplayed();
        await this.isElementVisible(this.resultEmployeeNameCell(employeeName),`Employee Name ${employeeName}`);
        await this.isElementVisible(this.resultLeaveTypeCell(leaveType),`Leave Type ${leaveType}`);
        logger.info("Leave request validated successfully");
    }

    public async validateAssignedLeaveRequest(employeeName: string, leaveType: string): Promise<void> {
        await this.leaveListMenu().click();
        await this.verifyLeaveListPageDisplayed();
        await this.fill(this.employeeNameInput(),employeeName,"Employee Name");
        await this.click(this.entitlementEmployeeNameSearchResult(employeeName),"Employee Name result");
        await this.click(this.searchButton(),"Search Button");
        await this.isElementVisible(this.resultEmployeeNameCell(employeeName),`Employee Name ${employeeName}`);
        await this.isElementVisible(this.resultLeaveTypeCell(leaveType),`Leave Type ${leaveType}`);
    }

    public async approveLeaveRequest(): Promise<void> {
        await this.clickApproveButton();
        await this.isElementVisible(this.toastMessage("Successfully Updated"),"Leave Approved Toast Message");
    } 

    public async searchLeaveRequest(employeeName: string): Promise<void> {
        await this.fill(this.employeeNameInput(),employeeName,"Employee Name");
        await this.click(this.searchButton(),"Search Button");
    }

}