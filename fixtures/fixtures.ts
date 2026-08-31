import { test as base, expect } from "@playwright/test";

import { SignupPage } from "../pages/SignupPage";
import { LoginPage } from "../pages/LoginPage";
import {BasePage} from "../pages/BasePage";
import {RegisterUserPage} from "../pages/RegisterUserPage";
import { SauceDemoLoginPage } from "../pages/SauceLoginPage";
import { SauceDemoProductsPage } from "../pages/SauceProductPage";
import { SauceDemoCartPage } from "../pages/SauceCartPage";
import { SauceDemoCheckOutPage } from "../pages/SauceCheckOutPage";
import { OrangeLoginPage } from "../pages/OrangeLoginPage";
import { OrangePimPage } from "../pages/OrangePimPage";
import { OrangeAddEmployeePage } from "../pages/OrangeAddEmployeePage";
import { OrangeEmpDetailsPage } from "../pages/OrangeEmpDetailsPage";
import { OrangeAdminPage } from "../pages/OrangeAdminPage";

type PageFixtures = {
  signupPage: SignupPage;
  loginPage: LoginPage;
  basePage: BasePage;
  registerUserPage: RegisterUserPage;
  sauceDemoLoginPage: SauceDemoLoginPage;
  sauceDemoProductsPage: SauceDemoProductsPage;
  sauceDemoCartPage: SauceDemoCartPage;
  sauceDemoCheckOutPage: SauceDemoCheckOutPage;
  orangeLoginPage: OrangeLoginPage;
  orangePimPage: OrangePimPage;
  orangeAddEmployeePage: OrangeAddEmployeePage;
  orangeEmpDetailsPage: OrangeEmpDetailsPage;
  orangeAdminPAge: OrangeAdminPage;
};

export const test = base.extend<PageFixtures>({

  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);

    await use(signupPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

   basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);

    await use(basePage);
  },

  registerUserPage: async ({ page }, use) => {
    const registerUserPage = new RegisterUserPage(page);

    await use(registerUserPage);
  },

  sauceDemoLoginPage: async ({ page }, use) => {
    const sauceDemoLoginPage = new SauceDemoLoginPage(page);  

    await use(sauceDemoLoginPage);
  },

  sauceDemoProductsPage: async ({ page }, use) => {
    const sauceDemoProductsPage = new SauceDemoProductsPage(page);

    await use(sauceDemoProductsPage);

  },

  sauceDemoCartPage: async ({ page }, use) => {
    const sauceDemoCartPage = new SauceDemoCartPage(page);

    await use(sauceDemoCartPage);
  },

  sauceDemoCheckOutPage: async ({ page }, use) => {
    const sauceDemoCheckOutPage = new SauceDemoCheckOutPage(page);

    await use(sauceDemoCheckOutPage);
  },

  orangeLoginPage: async ({ page }, use) => {
    const orangeLoginPage = new OrangeLoginPage(page);

    await use(orangeLoginPage);
  },

  orangePimPage: async ({ page }, use) => {
    const orangePimPage = new OrangePimPage(page);

    await use(orangePimPage);
  },

  orangeAddEmployeePage: async ({ page }, use) => {
    const orangeAddEmployeePage = new OrangeAddEmployeePage(page);

    await use(orangeAddEmployeePage); 
  },

  orangeEmpDetailsPage: async ({ page }, use) => {
    const orangeEmpDetailsPage = new OrangeEmpDetailsPage(page);

    await use(orangeEmpDetailsPage);  
  },

  orangeAdminPAge: async({page}, use) => {
    const orangeAdminPage = new OrangeAdminPage(page);

    await use(orangeAdminPage);
  }

  });

export { expect };