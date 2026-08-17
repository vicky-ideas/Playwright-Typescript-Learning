import { expect } from "@playwright/test";
import { BaseClass } from "./BasePage";
import { logger } from "../utils/logger";

let products: string[] = [];

export class SauceDemoProductsPage extends BaseClass {
  private readonly productsHeading = () =>
    this.page.getByText("Products", { exact: true });

  private readonly sortDropdown = () =>
    this.page.locator('//select[@data-test="product-sort-container"]');

  private readonly productNames = () =>
    this.page.locator(".inventory_item_name");

  private readonly productPrices = () =>
    this.page.locator(".inventory_item_price");

  private readonly cartLink = () => this.page.locator(".shopping_cart_link");

  private readonly cartBadge = () => this.page.locator(".shopping_cart_badge");

  private readonly backpackAddToCartButton = () =>
    this.page.locator("//button[@data-test='add-to-cart-sauce-labs-backpack']");

  private readonly bikelightAddToCartButton = () =>
    this.page.locator(
      "//button[@data-test='add-to-cart-sauce-labs-bike-light']",
    );

  private readonly onesieAddToCartButton = () =>
    this.page.locator("//button[@data-test='add-to-cart-sauce-labs-onesie']");

  public async verifyProductsPage(): Promise<void> {
    await expect(this.productsHeading()).toBeVisible();
    logger.info("Products page is displayed");
  }

  public async addThreeProductsToCart(): Promise<string[]> {
    const selectedProducts: string[] = [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Onesie",
    ];

    await this.backpackAddToCartButton().click();
    await this.bikelightAddToCartButton().click();
    await this.onesieAddToCartButton().click();

    await logger.info("Three products added to cart");

    return selectedProducts;
  }

  public async verifyCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge()).toHaveText(expectedCount.toString());
  }

  public async clickCartLink(): Promise<void> {
    await this.cartLink().click();

    await logger.info("Navigated to the cart page");
  }

  public async selectascSortOption(): Promise<void> {
    await this.sortDropdown().selectOption("az");
    let products = await this.productNames().allTextContents();
    let sortedProducts = products.sort((a, b) => a.localeCompare(b));
    expect(products).toEqual(sortedProducts);
  }

  public async selectdescSortOption(): Promise<void> {
    await this.sortDropdown().selectOption("za");
    let products = await this.productNames().allTextContents();
    let sortedProducts = products.sort((a, b) => b.localeCompare(a));
    expect(products).toEqual(sortedProducts);
  }

  public async selectlowtohighSortOption(): Promise<void> {
    await this.sortDropdown().selectOption("lohi");
    let products = await this.productPrices().allTextContents();
    let sortedProducts = products.sort((a, b) => a.localeCompare(b));
    expect(products).toEqual(sortedProducts);
  }

  public async selecthightolowSortOption(): Promise<void> {
    await this.sortDropdown().selectOption("hilo");
    let products = await this.productPrices().allTextContents();
    let sortedProducts = products.sort((a, b) => b.localeCompare(a));
    expect(products).toEqual(sortedProducts);
  }
}
