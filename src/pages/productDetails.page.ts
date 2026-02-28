import { expect, Page } from "@playwright/test";
import { ProductDetails } from "../entity/productDetails";
import { BasePage } from "./base.page";

export class ProductDetailsPage extends BasePage {
  readonly productName;
  readonly productDescription;
  readonly productPrice;
  readonly backToProductsButton;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator(".inventory_details_name");
    this.productDescription = page.locator(".inventory_details_desc");
    this.productPrice = page.locator(".inventory_details_price");
    this.backToProductsButton = page.locator("#back-to-products");
  }

  async verifyProductDetails(product: ProductDetails) {
    await expect(this.page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
    await expect(this.productName).toHaveText(product.title);
    await expect(this.productDescription).toHaveText(product.description);
    await expect(this.productPrice).toHaveText(`$${product.price.toFixed(2)}`);
  }

  async goBackToProducts() {
    await this.backToProductsButton.click();
  }
}
