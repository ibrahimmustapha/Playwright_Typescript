import { expect, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductsPage extends BasePage {
  readonly inventoryItem;
  readonly sortDropdown;
  readonly shoppingCartLink;
  readonly shoppingCartBadge;

  constructor(page: Page) {
    super(page);
    this.inventoryItem = page.locator(".inventory_item");
    this.sortDropdown = page.locator(".product_sort_container");
    this.shoppingCartLink = page.locator(".shopping_cart_link");
    this.shoppingCartBadge = page.locator(".shopping_cart_badge");
  }

  private getProductCard(productName: string) {
    return this.inventoryItem.filter({ hasText: productName }).first();
  }

  async verifyProductDisplayed(productName: string) {
    await expect(this.getProductCard(productName)).toBeVisible();
  }

  async verifyProductPrice(productName: string, expectedPrice: number) {
    const expectedPriceText = `$${expectedPrice.toFixed(2)}`;
    await expect(
      this.getProductCard(productName).locator(".inventory_item_price")
    ).toHaveText(expectedPriceText);
  }

  async openProduct(productName: string) {
    await this.page
      .locator(".inventory_item_name", { hasText: productName })
      .first()
      .click();
  }

  async addProductToCart(productName: string) {
    await this.getProductCard(productName)
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async verifyProductAddedToCart(productName: string) {
    await expect(
      this.getProductCard(productName).getByRole("button", { name: "Remove" })
    ).toBeVisible();
  }

  async verifyCartBadgeCount(count: number) {
    await expect(this.shoppingCartBadge).toHaveText(count.toString());
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }

  async verifyProductInCart(productName: string) {
    await expect(this.page.locator(".cart_item", { hasText: productName })).toBeVisible();
  }

  async sortBy(option: "Name (A to Z)" | "Name (Z to A)" | "Price (low to high)" | "Price (high to low)") {
    await this.sortDropdown.selectOption({ label: option });
  }

  async verifyPricesAreSortedLowToHigh() {
    const prices = await this.page
      .locator(".inventory_item_price")
      .allTextContents();
    const numericPrices = prices.map((price) => Number(price.replace("$", "")));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
  }
}
