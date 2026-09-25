import { test } from "../fixtures/fixtures";
import { orangeHrmData} from "../test-data/orangeHrmData";
import { getOrangeHrmConfig } from "../config/orangeHRMConfig";
import { logger } from "../utils/logger";

test ( "Task 6 - OrangeHRM Login Test", async ({ orangeLoginPage, orangePimPage, orangeAddEmployeePage, orangeEmpDetailsPage, orangeAdminPage }) => {

    let employeeID :  string;
    let employeeName : string;
    const config = getOrangeHrmConfig();

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
        employeeName = await employeeDetails.lastName;
        await orangeAddEmployeePage.fillEmployeeDetails(employeeDetails);
        employeeID = await orangeEmpDetailsPage.getEmployeeID();
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
        await orangePimPage.enterEmployeeID(employeeID);
        await orangePimPage.clickSearchButton();
        await orangePimPage.verifySearchResult(employeeName);
        await orangePimPage.clickEditButton();
        await orangeEmpDetailsPage.verifyEmpDetailsPageDisplayed();
    })

    await test.step("Update Employee Details", async() => {
        await orangeEmpDetailsPage.updateEmployeeDetails(orangeHrmData.nationality,orangeHrmData.maritalStatus,orangeHrmData.gender,orangeHrmData.driversLicenseNumber);
    })

    await test.step("validate employee updated values", async() => {
        await orangeEmpDetailsPage.validateUpdatedDetails(orangeHrmData.maritalStatus, orangeHrmData.nationality)
    })
    
    await test.step("Add new admin system user and validate the new user", async() => {
        await orangeAdminPage.addNewSystemUser(orangeHrmData.adminUserRole,employeeName,orangeHrmData.adminStatus,employeeName,config.password,config.password);
        await orangeAdminPage.validateNewAdminUser(employeeName);
    })

    await test.step("Validate new user login and logout", async () => {
        await orangeLoginPage.logoutUser();
        await orangeLoginPage.verifyLoginPageDisplayed();
        await orangeLoginPage.loginToOrangeHRM(employeeName,config.password);
        await orangeLoginPage.verifySuccessfulLogin();
        await orangeLoginPage.logoutUser();
    })

    await test.step("Delete the newly created admin user and employee", async() => {
        await orangeLoginPage.loginToOrangeHRM(config.username,config.password);
        await orangeAdminPage.deleteAdminUser(employeeName);
        await orangePimPage.clickPimMenu();
        await orangePimPage.deleteEmployee(employeeID,employeeName);
        await orangeLoginPage.logoutUser();
    })

});