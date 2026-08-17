import { expect } from "@playwright/test";
import { BaseClass } from "./BasePage";
import { logger } from "../utils/logger";

export class SauceDemoCartPage extends BaseClass {
  private readonly cartItems = () => this.page.locator(".cart_item");

  private readonly cartItemNames = () =>
    this.page.locator('.cart_item [data-test$="-title-link"]');

  private readonly checkoutButton = () =>
    this.page.getByRole("button", {name: "Checkout",});

  public async verifySelectedProducts(
    expectedProducts: string[],
  ): Promise<void> {
    const actualProducts = await this.cartItemNames().allTextContents();
    console.log("Actual Products in Cart: ", actualProducts);
    expect(actualProducts).toEqual(expect.arrayContaining(expectedProducts));
    expect(actualProducts).toHaveLength(expectedProducts.length);
    await logger.info("All selected products are displayed in the cart");
  }

  public async verifyCartItemCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems()).toHaveCount(expectedCount);
    await logger.info(`Cart contains ${expectedCount} products`);
  }

  public async clickCheckout(): Promise<void> {
    await this.checkoutButton().click();
    await logger.info("Checkout process started");
  }
}
