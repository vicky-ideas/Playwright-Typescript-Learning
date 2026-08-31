import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../utils/logger";

export const SORT_OPTIONS = {
  NAME_ASCENDING: "az",
  NAME_DESCENDING: "za",
  PRICE_LOW_TO_HIGH: "lohi",
  PRICE_HIGH_TO_LOW: "hilo"
  } as const

export type SortOption = typeof SORT_OPTIONS [keyof typeof SORT_OPTIONS];


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

  public async getProductNames(): Promise<string []> {
    return await this.productNames().allTextContents();
  }

  public async getProductPrices(): Promise<number[]> {
    const productPrices = await this.productPrices().allTextContents();
    return productPrices.map((price) => Number(price.replace("$", "")));
  }

  public async verifyProductsSortedByNameAscending(): Promise<void> {
   const products  = await this.getProductNames();
    const sortedProducts = [...products].sort((a, b) => a.localeCompare(b));
    expect(products).toEqual(sortedProducts);
  }

  public async verifyProductsSortedByNameDescending(): Promise<void> {
    const products = await this.getProductNames();
    const sortedProducts = [...products].sort((a, b) => b.localeCompare(a));
    expect(products).toEqual(sortedProducts);
  }

  public async verifyProductsSortedByPriceAscending(): Promise<void> {
    const Prices = await this.getProductPrices();
    const sortedPrices = [...Prices].sort((a, b) => a - b);
    expect(Prices).toEqual(sortedPrices);
  }

  public async verifyProductsSortedByPriceDescending(): Promise<void> {
    const Prices = await this.getProductPrices();
    const sortedPrices = [...Prices].sort((a, b) => b - a);
    expect(Prices).toEqual(sortedPrices);
  }

  public async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator(".inventory_item").filter({ hasText: productName });
    await product.getByRole("button", { name: /Add to cart/i }).click();
    logger.info(`Product added to cart: ${productName}`);
}

}