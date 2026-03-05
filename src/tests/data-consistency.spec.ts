// spec: specs/plan.md
// seed: src/tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductsPage } from "../pages/products.page";
import { ProductDetailsPage } from "../pages/productDetails.page";
import { productCatalog, Products } from "../entity/data/products";
import { standardUser } from "../entity/data/users";

test.describe("Data Consistency and Price Checks", () => {
  test("Verify product prices and currency formatting across views", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("/");
    await loginPage.login(standardUser as any);

    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await productsPage.verifyProductDisplayed(Products.SAUCE_LABS_BACKPACK);

    for (const key of Object.keys(productCatalog) as Array<Products>) {
      const product = productCatalog[key];
      // Inventory price
      await productsPage.verifyProductPrice(product.title, product.price);
      // Product details price
      await productsPage.openProduct(product.title);
      await productDetailsPage.verifyProductDetails(product);
      // Add to cart and verify price in cart
      await productDetailsPage.page
        .getByRole("button", { name: "Add to cart" })
        .click();
      await productsPage.openCart();
      const expectedPriceText = `$${product.price.toFixed(2)}`;
      await expect(
        page.locator(".cart_item .inventory_item_price", {
          hasText: expectedPriceText,
        }),
      ).toBeVisible();
      // Clean up: remove from cart and go back
      await page.locator(".cart_item .btn_secondary").click();
      await page.goto("/inventory.html");
    }
  });
});
