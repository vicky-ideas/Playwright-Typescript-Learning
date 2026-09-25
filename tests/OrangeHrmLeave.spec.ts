import { test } from "../fixtures/fixtures";
import { orangeHrmData } from "../test-data/orangeHrmData";
import { getOrangeHrmConfig } from "../config/orangeHRMConfig";
import { logger } from "../utils/logger";
import { getFutureDate } from "../utils/futureDate";

test("Task 8 - OrangeHRM Leave Management Test", async ({ orangeLoginPage, orangePimPage, orangeAddEmployeePage, orangeEmpDetailsPage, orangeAdminPage, orangeLeavePage, basePage }) => {

    let employeeID: string = "";
    let employeeName: string = "";
    let essUserName: string = "";
    let essPassword: string = "";
    let employeeCreated = false;
    let systemUserCreated = false;
    let leaveType: string = "";

    const config = getOrangeHrmConfig();

    try {

        await test.step("Navigate to OrangeHRM Login Page", async () => {
            await orangeLoginPage.navigate(config.url);
            await orangeLoginPage.verifyLoginPageDisplayed();
        })

        await test.step("Login using valid credentials and validate successful login", async () => {
            await orangeLoginPage.loginToOrangeHRM(config.username, config.password);
            await orangeLoginPage.verifySuccessfulLogin();
        })

        await test.step("Click the PIM menu", async () => {
            await orangePimPage.clickPimMenu();
            await orangePimPage.verifyPimPageDisplayed();
        })

        await test.step("Click the Add Employee button", async () => {
            await orangePimPage.clickAddEmployeeButton();
            await orangeAddEmployeePage.verifyAddEmployeePageDisplayed();
        })

        await test.step("Fill in the employee details and submit the form", async () => {
            const employeeDetails = orangeHrmData.generateUniqueEmployeeData();
            employeeName = employeeDetails.lastName;
            await orangeAddEmployeePage.fillEmployeeDetails(employeeDetails);
            employeeID = await orangeEmpDetailsPage.getEmployeeID();
            await orangeAddEmployeePage.uploadProfilePicture(orangeHrmData.profilePicPath);
            await orangeAddEmployeePage.submitEmployeeForm();
            await orangeEmpDetailsPage.verifyEmpDetailsPageDisplayed();
            employeeCreated = true;
            logger.info("Employee created successfully");
        })

        await test.step("Navigate to the Employee List", async () => {
            await orangeEmpDetailsPage.clickEmployeeList();
            await orangePimPage.verifyEmployeeInformationHeadingDisplayed();
        })

        await test.step("Search and validate with employee ID", async () => {
            await orangePimPage.enterEmployeeID(employeeID);
            await orangePimPage.clickSearchButton();
            await orangePimPage.verifySearchResult(employeeName);
        })

        await test.step("Create a ESS user", async () => {
            const essCredentials = orangeHrmData.generateUniqueEssCredentials();
            essUserName = essCredentials.essUserName;
            essPassword = essCredentials.essPassword;
            await orangeAdminPage.addNewSystemUser(orangeHrmData.essUserRole, employeeName, orangeHrmData.adminStatus, essUserName, essPassword, essPassword);
            systemUserCreated = true;
        })

        await test.step("Validate new ESS user", async () => {
            await orangeAdminPage.validateNewAdminUser(essUserName);
        })

        await test.step("Add Entitlement for the Employee", async () => {
            await orangeLeavePage.clickLeaveMenu();
            await orangeLeavePage.clickEntitlementMenu();
            await orangeLeavePage.clickAddEntitlementsMenu();
            await orangeLeavePage.enterEntitlementEmployee(employeeName);
            leaveType = await orangeLeavePage.selectEntitlementLeaveType();
            await orangeLeavePage.enterEntitlement(orangeHrmData.entitlementValue);
            await orangeLeavePage.saveEntitlement();
            logger.info("Entitlement Saved Successfully");
            await orangeLoginPage.logoutUser();
        })

        await test.step("Login as the new ESS user", async () => {
            await orangeLoginPage.loginToOrangeHRM(essUserName, essPassword);
            await orangeLoginPage.goToDashboard();
            await orangeLoginPage.verifySuccessfulLogin();
        })

        await test.step("Apply leave for a future date and logout the new ESS user", async () => {
            const fromDate = getFutureDate(4);
            await orangeLeavePage.clickLeaveMenu();
            await orangeLeavePage.clickApplyMenu();
            await orangeLeavePage.verifyApplyLeavePageDisplayed();
            await orangeLeavePage.selectLeaveType(leaveType);
            await orangeLeavePage.fillFromDate(fromDate);
            await orangeLeavePage.fillComment(orangeHrmData.leaveComment);
            await orangeLeavePage.clickApplyButton();
            await orangeLeavePage.verifyToastMessage(orangeHrmData.successfullToastMessage);
            await orangeLeavePage.validateLeaveRequest(employeeName, leaveType, "Pending");
            await orangeLoginPage.logoutUser();
        })

        await test.step("Login as admin and navigate to leave page", async () => {
            await orangeLoginPage.loginToOrangeHRM(config.username, config.password);
            await orangeLeavePage.clickLeaveMenu();
        })

        await test.step("Validate and approve leave request by admin login", async () => {
            await orangeLeavePage.validateAssignedLeaveRequest(employeeName, leaveType);
            await orangeLeavePage.approveLeaveRequest();
            logger.info("Leave request approved successfully");
            await orangeLoginPage.logoutUser();
        })

        await test.step("Login as the new ESS user", async () => {
            await orangeLoginPage.loginToOrangeHRM(essUserName, essPassword);
            await orangeLeavePage.clickLeaveMenu();
        })

        await test.step("Validate approved leave status", async () => {
            await orangeLeavePage.validateLeaveRequest(employeeName, leaveType, "Scheduled");
        })

    } catch (error) {
        logger.error(`Leave management test failed: ${error}`);
        throw error;
    } finally {
        try {
            if (!employeeCreated && !systemUserCreated) {
                logger.info("No test data was created. Cleanup not required.");
            } else if (await basePage.isPageClosed()) {
                logger.error(
                    "Cleanup cannot be performed because the Playwright page is already closed."
                );
            } else {
                await orangeLoginPage.logoutUser();
                await orangeLoginPage.loginToOrangeHRM(config.username, config.password);
                await orangeLoginPage.goToDashboard();

                if (systemUserCreated) {
                    await orangeAdminPage.deleteAdminUser(essUserName);
                    logger.info(`System user deleted: ${employeeName}`);
                }

                if (employeeCreated) {
                    if (!employeeID) {
                        throw new Error(
                            "Cleanup cannot continue because Employee ID was not captured"
                        );
                    }

                    await orangePimPage.clickPimMenu();
                    await orangePimPage.deleteEmployee(employeeID, employeeName);

                    logger.info(`Employee deleted: ${employeeName}`);
                }

                await orangeLoginPage.logoutUser();
                logger.info("Cleanup completed successfully");
            }

        } catch (cleanupError) {
            logger.error(`Cleanup failed: ${cleanupError}`);
        }
    }

});