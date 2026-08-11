import { test as base, expect } from "@playwright/test";

import { SignupPage } from "../pages/SignupPage";
import { LoginPage } from "../pages/LoginPage";
import {BaseClass} from "../pages/BasePage";
import {RegisterUserPage} from "../pages/RegisterUserPage";

type PageFixtures = {
  signupPage: SignupPage;
  loginPage: LoginPage;
  basePage: BaseClass;
  registerUserPage: RegisterUserPage;
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
  }

  });

export { expect };