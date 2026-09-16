import { logger } from "../utils/logger";
import { BasePage } from "./BasePage";

export class OrangeLeavePage extends BasePage {

    private readonly leavemenu = () => this.page.getByRole("link", { name: "Leave", exact: true });
    private readonly leaveListMenu = () => this.page.getByRole("link", { name: "Leave List" });
    private readonly myLeaveMenu = () => this.page.getByRole("link", { name: "My Leave" });
    private readonly applyMenu = () => this.page.getByRole("link", { name: "Apply" });
    private readonly employeeNameInput = () => this.page.locator('.oxd-input-group').filter({ hasText: "Employee Name" }).locator('input');
    private readonly searchButton = () => this.page.getByRole("button", { name: " Search " });
    private readonly resultEmployeeNameCell = (employeeName: string) => this.page.getByRole("cell", { name: employeeName });
    private readonly resultLeaveTypeCell = (leaveType: string) => this.page.getByRole("cell", { name: leaveType });
    private readonly applyLeaveHeading = () => this.page.getByRole("heading", { name: "Apply Leave" });
    private readonly leaveTypeDropdown = () => this.page.locator('.oxd-input-group').filter({ has: this.page.getByText("Leave Type", { exact: true }) }).locator(".oxd-select-text");
    private readonly leaveTypeOption = (leaveType: string) => this.page.getByRole("listbox").getByRole("option", { name: leaveType, exact: true });
    private readonly fromDateInput = () => this.page.locator('.oxd-input-group').filter({ hasText: "From Date" }).locator('input');
    private readonly commentInput = () => this.page.locator('.oxd-textarea');
    private readonly applyButton = () => this.page.getByRole("button", { name: " Apply " });
    private readonly leaveListHeading = () => this.page.getByRole("heading", { name: "Leave List" });
    private readonly leaveStatusCell = (leaveStatus: string) => this.page.getByRole("cell", { name: leaveStatus });
    private readonly approveButton = () => this.page.getByRole("button", { name: " Approve " });
    private readonly entitlementMenu = () => this.page.getByText("Entitlements ", { exact: true });
    private readonly addEntitlementsMenu = () => this.page.getByRole("menuitem", { name: "Add Entitlements" });
    private readonly entitlementEmployeeNameInput = () => this.page.locator('.oxd-input-group').filter({ hasText: "Employee Name" }).locator('input');
    private readonly employeeNameSearchResult = (employeeName: string) => this.page.locator('.oxd-autocomplete-option').filter({ hasText: employeeName });
    private readonly entitlementEntitlementInput = () => this.page.locator('.oxd-input-group').filter({ hasText: "Entitlement" }).locator('input');
    private readonly entitlementSaveButton = () => this.page.getByRole("button", { name: " Save " });
    private readonly confirmEntitlementButton = () => this.page.getByRole("button", { name: ' Confirm ' });
    private readonly toastMessage = (message: string) => this.page.locator(".oxd-toast").filter({ hasText: message });
    private readonly entitlementLeaveTypeDropdown = () => this.page.locator(".oxd-input-group").filter({ has: this.page.getByText("Leave Type", { exact: true }) }).locator(".oxd-select-text");


    public async selectEntitlementLeaveType(): Promise<string> {
        await this.click(
            this.entitlementLeaveTypeDropdown(),
            "Leave Type Dropdown"
        );

        const options = this.page
            .getByRole("listbox")
            .getByRole("option");

        const optionCount = await options.count();

        for (let i = 0; i < optionCount; i++) {
            const text = (await options.nth(i).innerText()).trim();

            if (text && text !== "-- Select --") {
                await this.click(
                    options.nth(i),
                    `Leave Type ${text}`
                );

                logger.info(`Leave type selected dynamically: ${text}`);

                return text;
            }
        }

        throw new Error("No valid Leave Type was found");
    }




    public async clickLeaveMenu(): Promise<void> {
        await this.click(this.leavemenu(), "Leave Menu")
    }

    public async verifyApplyLeavePageDisplayed(): Promise<void> {
        await this.isElementVisible(this.applyLeaveHeading(), "Apply Leave Heading")
    }

    public async selectLeaveType(leaveType: string): Promise<void> {
        await this.click(this.leaveTypeDropdown(), "Leave Type Dropdown")
        await this.click(this.leaveTypeOption(leaveType), `Leave Type ${leaveType}`);
    }

    public async fillFromDate(fromDateValue: string): Promise<void> {
        await this.fill(this.fromDateInput(), fromDateValue, "From Date")
    }

    public async fillComment(commentValue: string): Promise<void> {
        await this.fill(this.commentInput(), commentValue, "Comment")
    }

    public async clickApplyButton(): Promise<void> {
        await this.click(this.applyButton(), "Apply Button")
    }

    public async verifyLeaveListPageDisplayed(): Promise<void> {
        await this.isElementVisible(this.leaveListHeading(), "Leave List Heading")
    }

    public async verifyLeaveStatus(leaveStatus: string): Promise<void> {
        await this.isElementVisible(this.leaveStatusCell(leaveStatus), `Leave Status ${leaveStatus}`)
    }

    public async clickApproveButton(): Promise<void> {
        await this.click(this.approveButton(), "Approve Button")
    }

    public async clickEntitlementMenu(): Promise<void> {
        await this.click(this.entitlementMenu(), "Entitlement Menu")
    }

    public async clickAddEntitlementsMenu(): Promise<void> {
        await this.click(this.addEntitlementsMenu(), "Add Entitlements Menu")
    }

    public async addEntitlement(employeeName: string, entitlementValue: string): Promise<string> {
        await this.clickLeaveMenu();
        await this.clickEntitlementMenu();
        await this.clickAddEntitlementsMenu();
        await this.fill(this.entitlementEmployeeNameInput(), employeeName, "Employee Name");
        await this.click(this.employeeNameSearchResult(employeeName), "Employee Name result");
        const leaveType = await this.selectEntitlementLeaveType();
        await this.fill(this.entitlementEntitlementInput(), entitlementValue, "Entitlement");
        await this.click(this.entitlementSaveButton(), "Save Button");
        await this.click(this.confirmEntitlementButton(), "Confirm Entitlement Button");
        logger.info("Entitlement added successfully");
        return leaveType;
    }

    public async applyLeave(leaveType: string, fromDateValue: string, commentValue: string): Promise<void> {
        await this.leavemenu().click();
        await this.applyMenu().click();
        await this.verifyApplyLeavePageDisplayed();
        await this.selectLeaveType(leaveType);
        await this.fillFromDate(fromDateValue);
        await this.fillComment(commentValue);
        await this.clickApplyButton();
        await this.isElementVisible(this.toastMessage("Successfully Saved"), "Leave Applied Toast Message");
        logger.info("Leave applied successfully");
    }

    public async validateLeaveRequest(employeeName: string, leaveType: string): Promise<void> {
        await this.myLeaveMenu().click();
        await this.verifyLeaveListPageDisplayed();
        await this.isElementVisible(this.resultEmployeeNameCell(employeeName), `Employee Name ${employeeName}`);
        await this.isElementVisible(this.resultLeaveTypeCell(leaveType), `Leave Type ${leaveType}`);
        logger.info("Leave request validated successfully");
    }

    public async validateAssignedLeaveRequest(employeeName: string, leaveType: string): Promise<void> {
        await this.leaveListMenu().click();
        await this.verifyLeaveListPageDisplayed();
        await this.fill(this.employeeNameInput(), employeeName, "Employee Name");
        await this.click(this.employeeNameSearchResult(employeeName), "Employee Name result");
        await this.click(this.searchButton(), "Search Button");
        await this.isElementVisible(this.resultEmployeeNameCell(employeeName), `Employee Name ${employeeName}`);
        await this.isElementVisible(this.resultLeaveTypeCell(leaveType), `Leave Type ${leaveType}`);
    }

    public async approveLeaveRequest(): Promise<void> {
        await this.clickApproveButton();
        await this.isElementVisible(this.toastMessage("Successfully Updated"), "Leave Approved Toast Message");
    }

    public async searchLeaveRequest(employeeName: string): Promise<void> {
        await this.fill(this.employeeNameInput(), employeeName, "Employee Name");
        await this.click(this.searchButton(), "Search Button");
    }

}