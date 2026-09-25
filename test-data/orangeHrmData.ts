import path from "path";

export const orangeHrmData = {
    nationality: "Indian",
    gender: "Male",
    driversLicenseNumber: "123213434343",
    maritalStatus: "Single",
    adminUserRole:"Admin",
    essUserRole: "ESS",
    adminStatus: "Enabled",
    //leaveType: "CAN - Vacation",
    leaveComment: "Vacation Leave",
    entitlementValue: "10",
    profilePicPath:path.resolve(__dirname, "../test-data/ProfilePicture.jpg"),
    successfullToastMessage: "Successfully Saved",
    generateUniqueEmployeeData: function() {
        const timestamp = Date.now().toString().slice(-6);
        return {
            firstName: `First${timestamp}`,
            middleName: `Mid${timestamp}`,
            lastName: `Last${timestamp}`,
            employeeId: `23${timestamp}`
        };
    },
    generateUniqueEssCredentials: function(){
        const timestamp = Date.now().toString().slice(-4);
        return{
            essUserName: `ESS${timestamp}`,
            essPassword: `admin_${timestamp}`
        }
    }
};