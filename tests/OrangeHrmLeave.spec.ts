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
    let testFailed = false;
    let testFailure: unknown;
    const cleanupFailures: string[] = [];

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
            await orangeAddEmployeePage.clickSaveButton();
            employeeCreated = true;
            await orangeEmpDetailsPage.verifyEmpDetailsPageDisplayed();
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

        await test.step("Create an ESS user", async () => {
            const essCredentials = orangeHrmData.generateUniqueEssCredentials();
            essUserName = essCredentials.essUserName;
            essPassword = essCredentials.essPassword;
            await orangeAdminPage.clickAdminMenu();
            await orangeAdminPage.validateSystemUsersHeading();
            await orangeAdminPage.clickAddUserButton();
            await orangeAdminPage.validateAddUserHeading();
            await orangeAdminPage.selectUserRole(orangeHrmData.essUserRole);
            await orangeAdminPage.fillEmployeeName(employeeName);
            await orangeAdminPage.selectStatus(orangeHrmData.adminStatus);
            await orangeAdminPage.fillUserName(essUserName);
            await orangeAdminPage.fillPassword(essPassword);
            await orangeAdminPage.fillConfirmPassword(essPassword);
            await orangeAdminPage.clickSaveButton();
            systemUserCreated = true;
            await orangeAdminPage.validateSystemUserHeading();
            logger.info("ESS user created successfully");
        })

        await test.step("Validate new ESS user", async () => {
            await orangeAdminPage.validateNewSystemUser(essUserName);
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
            const fromDate = getFutureDate(6);
            await orangeLeavePage.clickLeaveMenu();
            await orangeLeavePage.clickApplyMenu();
            await orangeLeavePage.verifyApplyLeavePageDisplayed();
            await orangeLeavePage.selectLeaveType(leaveType);
            await orangeLeavePage.fillFromDate(fromDate);
            await orangeLeavePage.fillComment(orangeHrmData.leaveComment);
            await orangeLeavePage.clickApplyButton();
            await orangeLeavePage.verifyToastMessage(orangeHrmData.successfulToastMessage);
            await orangeLeavePage.clickMyLeaveMenu();
            await orangeLeavePage.verifyLeaveListPageDisplayed();
            await orangeLeavePage.verifyLeaveRequestStatus(employeeName, leaveType, orangeHrmData.pendingLeaveStatus);
            await orangeLoginPage.logoutUser();
        })

        await test.step("Login as admin and navigate to leave page", async () => {
            await orangeLoginPage.loginToOrangeHRM(config.username, config.password);
            await orangeLeavePage.clickLeaveMenu();
        })

        await test.step("Validate leave request by admin login", async () => {
            await orangeLeavePage.searchLeaveRequest(employeeName);
            await orangeLeavePage.verifyLeaveRequestStatus(employeeName, leaveType, orangeHrmData.pendingLeaveStatus);
        })

        await test.step("Approve leave request by admin login", async () => {
            await orangeLeavePage.clickApproveLeaveRequest(employeeName, leaveType);
            await orangeLeavePage.verifyToastMessage(orangeHrmData.updatedToastMessage);
            logger.info("Leave request approved successfully");
            await orangeLeavePage.selectShowLeaveWithStatus(orangeHrmData.approvedLeaveStatus);
            await orangeLeavePage.clickSearchButton();
            await orangeLeavePage.verifyLeaveRequestStatus(employeeName, leaveType, orangeHrmData.approvedLeaveStatus);
            await orangeLoginPage.logoutUser();
        })

        await test.step("Login as the new ESS user", async () => {
            await orangeLoginPage.loginToOrangeHRM(essUserName, essPassword);
            await orangeLeavePage.clickLeaveMenu();
        })

        await test.step("Validate approved leave status", async () => {
            await orangeLeavePage.clickMyLeaveMenu();
            await orangeLeavePage.verifyLeaveListPageDisplayed();
            await orangeLeavePage.verifyLeaveRequestStatus(employeeName, leaveType, orangeHrmData.approvedLeaveStatus);
        })

    } catch (error) {
        logger.error(`Leave management test failed: ${error}`);
        testFailed = true;
        testFailure = error;
    } finally {
        if (!employeeCreated && !systemUserCreated) {
            logger.info("No test data was created. Cleanup not required.");
        } else if (await basePage.isPageClosed()) {
            const message =
                "Cleanup cannot be performed because the Playwright page is already closed.";
            logger.error(message);
            cleanupFailures.push(message);
        } else {
            const loginAsAdmin = async (): Promise<void> => {
                try {
                    await orangeLoginPage.logoutUser();
                } catch (logoutError) {
                    logger.info(`Could not log out before cleanup: ${logoutError}`);
                }

                await orangeLoginPage.loginToOrangeHRM(config.username, config.password);
                await orangeLoginPage.verifySuccessfulLogin();
            };

            if (systemUserCreated) {
                try {
                    await loginAsAdmin();
                    await orangeAdminPage.deleteAdminUser(essUserName);
                    logger.info(`ESS user deleted: ${essUserName}`);
                } catch (cleanupError) {
                    const message = `ESS user cleanup failed: ${String(cleanupError)}`;
                    logger.error(message);
                    cleanupFailures.push(message);
                }
            }

            if (employeeCreated) {
                try {
                    await loginAsAdmin();
                    await orangePimPage.clickPimMenu();
                    await orangePimPage.deleteEmployee(employeeID, employeeName);
                    logger.info(
                        `Employee deleted: name="${employeeName}", ID="${employeeID}"`
                    );
                } catch (cleanupError) {
                    const message = `Employee cleanup failed: ${String(cleanupError)}`;
                    logger.error(message);
                    cleanupFailures.push(message);
                }
            }
        }
    }

    if (testFailed && cleanupFailures.length > 0) {
        throw new Error(
            `Task 8 failed: ${String(testFailure)}; ` +
            `cleanup failures: ${cleanupFailures.join("; ")}`
        );
    }

    if (testFailed) {
        throw testFailure;
    }

    if (cleanupFailures.length > 0) {
        throw new Error(`Cleanup failures: ${cleanupFailures.join("; ")}`);
    }

});