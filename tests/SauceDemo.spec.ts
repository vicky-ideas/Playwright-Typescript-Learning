import { test } from "../fixtures/fixtures";
import { sauceDemoData } from "../test-data/saucedemoData";
import { env } from "../config/environment";

test("Task 5 - SauceDemo Shopping ", async ({
  sauceDemoLoginPage,
  sauceDemoProductsPage,
  sauceDemoCartPage,
  sauceDemoCheckOutPage,
}) => {

  const selectedProducts: string[] = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Onesie",
  ];

  await test.step("Login using valid credentials", async () => {
    await sauceDemoLoginPage.navigate(env.sauceDemoUrl);
    await sauceDemoLoginPage.verifyLoginPageDisplayed();
    await sauceDemoLoginPage.login(
      sauceDemoData.login.username,
      sauceDemoData.login.password,
    );
  });

  await test.step("Verify Products Page is displayed", async () => {
    await sauceDemoProductsPage.verifyProductsPage();
  });

  await test.step("Sort products in ascending order", async () => {
    await sauceDemoProductsPage.selectsortOption("az");
    await sauceDemoProductsPage.selectascSortOption();
  });

  await test.step("Sort products in descending order", async () => {
    await sauceDemoProductsPage.selectsortOption("za");
    await sauceDemoProductsPage.selectdescSortOption();
  });

  await test.step("Sort products from low to high", async () => {
    await sauceDemoProductsPage.selectsortOption("lohi");
    await sauceDemoProductsPage.selectlowtohighSortOption();
  });

  await test.step("Sort products from high to low", async () => {
    await sauceDemoProductsPage.selectsortOption("hilo");
    await sauceDemoProductsPage.selecthightolowSortOption();
  });

  await test.step("Add products to cart", async () => {

    for (const product of selectedProducts) {
      await sauceDemoProductsPage.addProductToCart(product);
    }
  });

  await test.step("Verify cart badge count", async () => {
    await sauceDemoProductsPage.verifyCartBadgeCount(3);
  });


  await test.step("Click on cart link", async () => {
    await sauceDemoProductsPage.clickCartLink();
  });

  await test.step("Verify selected products in cart", async () => {
    await sauceDemoCartPage.verifyCartItemCount(3);
    await sauceDemoCartPage.verifySelectedProducts(selectedProducts);
  });

  await test.step("Click on checkout button", async () => {
    await sauceDemoCartPage.clickCheckout();
  });

  await test.step("Enter customer information", async () => {
    await sauceDemoCheckOutPage.enterCustomerInformation(
      sauceDemoData.checkout.firstName,
      sauceDemoData.checkout.lastName,
      sauceDemoData.checkout.postalCode,
    );

    await sauceDemoCheckOutPage.clickContinue();
  });

  await test.step("Complete order", async () => {
    await sauceDemoCheckOutPage.clickFinish();

    await sauceDemoCheckOutPage.verifyOrderConfirmation();
  });

  await test.step("Logout", async () => {
    await sauceDemoCheckOutPage.logout();
  });

  await test.step("Verify user is redirected to login page", async () => {
    await sauceDemoLoginPage.verifyLoginPageDisplayed();
  });
});
