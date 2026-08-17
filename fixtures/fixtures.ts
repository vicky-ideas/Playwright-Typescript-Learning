import { test as base, expect } from "@playwright/test";

import { SignupPage } from "../pages/SignupPage";
import { LoginPage } from "../pages/LoginPage";
import {BaseClass} from "../pages/BasePage";
import {RegisterUserPage} from "../pages/RegisterUserPage";
import { SauceDemoLoginPage } from "../pages/SauceLoginPage";
import { SauceDemoProductsPage } from "../pages/SauceProductPage";
import { SauceDemoCartPage } from "../pages/SauceCartPage";
import { SauceDemoCheckOutPage } from "../pages/SauceCheckOutPage";

type PageFixtures = {
  signupPage: SignupPage;
  loginPage: LoginPage;
  basePage: BaseClass;
  registerUserPage: RegisterUserPage;
  sauceDemoLoginPage: SauceDemoLoginPage;
  sauceDemoProductsPage: SauceDemoProductsPage;
  sauceDemoCartPage: SauceDemoCartPage;
  sauceDemoCheckOutPage: SauceDemoCheckOutPage;
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
    const basePage = new BaseClass(page);

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
  }


  });

export { expect };