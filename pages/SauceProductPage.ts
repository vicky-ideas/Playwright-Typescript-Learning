import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";


export class SauceDemoProductsPage extends BasePage {
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

  public async verifyProductsPage(): Promise<void> {
    await expect(this.productsHeading()).toBeVisible();
    logger.info("Products page is displayed");
  }

  public async verifyCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge()).toHaveText(expectedCount.toString());
  }

  public async clickCartLink(): Promise<void> {
    await this.cartLink().click();
  }

  public async selectsortOption(option: string): Promise<void> {
    await this.sortDropdown().selectOption(option);
    logger.info(`Selected sort option: ${option}`);
  }

  public async selectascSortOption(): Promise<void> {
    let products = await this.productNames().allTextContents();
    let sortedProducts = [...products].sort((a, b) => a.localeCompare(b));
    expect(products).toEqual(sortedProducts);
  }

  public async selectdescSortOption(): Promise<void> {
    let products = await this.productNames().allTextContents();
    let sortedProducts = [...products].sort((a, b) => b.localeCompare(a));
    expect(products).toEqual(sortedProducts);
  }

  public async selectlowtohighSortOption(): Promise<void> {
    let productPrices = await this.productPrices().allTextContents();
    let Prices = productPrices.map((price) => Number(price.replace("$", "")));
    let sortedPrices = [...Prices].sort((a, b) => a - b);
    expect(Prices).toEqual(sortedPrices);
  }

  public async selecthightolowSortOption(): Promise<void> {
    let productPrices = await this.productPrices().allTextContents();
    let Prices = productPrices.map((price) => Number(price.replace("$", "")));
    let sortedPrices = [...Prices].sort((a, b) => b - a);
    expect(Prices).toEqual(sortedPrices);
  }

  public async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator(".inventory_item").filter({ hasText: productName });
    await product.getByRole("button", { name: /Add to cart/i }).click();
    logger.info(`Product added to cart: ${productName}`);
}

}