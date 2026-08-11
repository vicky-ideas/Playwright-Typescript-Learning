import { autoEmail } from "../utils/autoEmail"

export const userData = {
signUpUserData : {
    name: "John",
},

registerUserDate :{
    Password:"Test@1234",
    FirstName:"Jacob",
    LastName:"Devis",
    Address:"St.Louis Street",
    State:"Texas",
    City:"Nevada",
    ZipCode:"34232",
    MobileNumber:"72828322",
    PasswordValidation:"Please fill out this field.",
    InvalidEmailValidation:"Please include an '@' in the email address. 'testtestgmail.com' is missing an '@'.",
    InvailidEmail:"testtestgmail.com"
},

loginUserData : {
    emptyFieldMessage: "Please fill out this field.",
    email: autoEmail.generateEmail,
    incorrectPassword: "1272Test",
    incorrectEmail:"test@gmail.com"
},

}