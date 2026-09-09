import { test } from "../fixtures/fixtures";
import { orangeHrmData} from "../test-data/orangeHrmData";
import { getOrangeHrmConfig } from "../config/orangeHRMConfig";
import { logger } from "../utils/logger";
import { getFutureDate } from "../utils/futureDate";

test ( "Task 7 & 8 - OrangeHRM Leave Management Test", async ({ orangeLoginPage, orangePimPage, orangeAddEmployeePage, orangeEmpDetailsPage, orangeAdminPAge, orangeLeavePage }) => {

    let empID :  string;
    let firstName : string;
    const config = getOrangeHrmConfig();

    await test.step("Navigate to OrangeHRM Login Page", async () => {
        await orangeLoginPage.navigate(config.url);
        await orangeLoginPage.verifyLoginPageDisplayed();
    })

    await test.step("Login using valid credentials and validate successful login", async () => {
        await orangeLoginPage.logintoOrangeHRM(config.username, config.password);
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
        const employeeDetails = orangeHrmData.generateUniqueEmployeeId();
        firstName =  employeeDetails.LastName;
        await orangeAddEmployeePage.fillEmployeeDetails(employeeDetails.FirstName, employeeDetails.MiddleName, employeeDetails.LastName, employeeDetails.EmployeeId);
        empID = await orangeEmpDetailsPage.getEmployeeID();
        await orangeAddEmployeePage.uploadProfilePicture(orangeHrmData.profilePicPath);
        await orangeAddEmployeePage.submitEmployeeForm();
        await orangeEmpDetailsPage.verifyEmpDetailsPageDisplayed();
        logger.info("Employee created successfully");
    })

    await test.step("Navigate to the Employee List", async () =>{
        await orangeEmpDetailsPage.clickEmployeeList();
        await orangePimPage.verifyEmployeeInformationHeadingDisplayed();
    })

    await test.step("Search and validate with employee ID", async () => {
        await orangePimPage.enterEmployeeID(empID);
        await orangePimPage.clickSearcButton();
        await orangePimPage.verifySearchResult(firstName);
    })
    
    await test.step("Create and validate new admin system user and logout the admin user", async() => {
        await orangeAdminPAge.addNewSystemUser(orangeHrmData.essUserRole,firstName,orangeHrmData.adminStatus,firstName,config.password,config.password);
        await orangeAdminPAge.validateNewAdminUser(firstName);
        await orangeLeavePage.addEntitlement(firstName,orangeHrmData.leaveType,orangeHrmData.entitlementValue);
        await orangeLoginPage.logoutUser();
        await orangeLoginPage.verifyLoginPageDisplayed();
    })

    await test.step("Validate new user login and apply leave for a future date", async () => {
        await orangeLoginPage.logintoOrangeHRM(firstName,config.password);
        await orangeLoginPage.verifySuccessfulLogin();
        const fromDate = getFutureDate(7);
        await orangeLeavePage.applyLeave(orangeHrmData.leaveType, fromDate, orangeHrmData.leaveComment);
        await orangeLeavePage.validateLeaveRequest(firstName,orangeHrmData.leaveType);
        await orangeLoginPage.logoutUser();
    })

    await test.step("Validate and approve leave request by admin login", async () => {
        await orangeLoginPage.logintoOrangeHRM(config.username,config.password);
        await orangeLeavePage.clickLeaveMenu();
        await orangeLeavePage.validateAssignedLeaveRequest(firstName,orangeHrmData.leaveType);
        await orangeLeavePage.approveLeaveRequest();
        logger.info("Leave request approved successfully");
    })

    await test.step("Delete the newly created admin user and employee", async() => {
        await orangeAdminPAge.deleteAdminUser(firstName);
        await orangePimPage.clickPimMenu();
        await orangePimPage.deleteEmployee(empID,firstName);
        await orangeLoginPage.logoutUser();
    })

});