import path from "path";

export const orangeHrmData = {
    nationality: "Indian",
    gender: "Male",
    driversLicenseNumber: "123213434343",
    maritalStatus: "Single",
    adminUserRole:"Admin",
    adminStatus: "Enabled",
    profilePicPath:path.resolve(__dirname, "../test-data/ProfilePicture.jpg"),
    generateUniqueEmployeeId: function() {
        const timestamp = Date.now().toString().slice(-6);
        return {
            FirstName: `First${timestamp}`,
            MiddleName: `Mid${timestamp}`,
            LastName: `Last${timestamp}`,
            EmployeeId: `23${timestamp}`
        };
    }
};