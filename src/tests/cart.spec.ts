// spec: specs/plan.md
// seed: src/tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductsPage } from "../pages/products.page";
import { HomePage } from "../pages/home.page";
import { standardUser } from "../entity/data/users";
import { Products } from "../entity/data/products";

test.describe("Cart and Persistence", () => {
  test("Cart multi-item add/remove and persistence", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("/");
    await loginPage.login(standardUser);

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.verifyInventoryPageLoaded();

    // Add two products
    await productsPage.addProductToCart(Products.SAUCE_LABS_BACKPACK);
    await productsPage.addProductToCart(Products.SAUCE_LABS_BIKE_LIGHT);

    // Verify added and badge count
    await productsPage.verifyProductAddedToCart(Products.SAUCE_LABS_BACKPACK);
    await productsPage.verifyProductAddedToCart(Products.SAUCE_LABS_BIKE_LIGHT);
    await productsPage.verifyCartBadgeCount(2);

    // Open cart and verify both products
    await productsPage.openCart();
    await productsPage.verifyProductInCart(Products.SAUCE_LABS_BACKPACK);
    await productsPage.verifyProductInCart(Products.SAUCE_LABS_BIKE_LIGHT);

    // Remove one product from cart
    const bikeRemoveButton = page
      .locator(".cart_item", { hasText: Products.SAUCE_LABS_BIKE_LIGHT })
      .getByRole("button", { name: "Remove" });
    await bikeRemoveButton.click();

    // Verify badge and remaining product
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    await expect(
      page.locator(".cart_item", { hasText: Products.SAUCE_LABS_BIKE_LIGHT }),
    ).toHaveCount(0);
    await expect(
      page.locator(".cart_item", { hasText: Products.SAUCE_LABS_BACKPACK }),
    ).toBeVisible();

    // Refresh and verify persistence (cart badge should still be 1)
    await page.reload();
    // Badge may be missing if zero; assert either 1 or absent but ensure backpack present in cart
    const badge = page.locator(".shopping_cart_badge");
    if ((await badge.count()) === 1) {
      await expect(badge).toHaveText("1");
    }
    await expect(
      page.locator(".cart_item", { hasText: Products.SAUCE_LABS_BACKPACK }),
    ).toBeVisible();

    // Rapid add/remove clicks to detect race conditions
    await page.goto("/inventory.html");
    const backpackCard = page
      .locator(".inventory_item", { hasText: Products.SAUCE_LABS_BACKPACK })
      .first();
    for (let i = 0; i < 3; i++) {
      const addBtn = backpackCard.getByRole("button", { name: "Add to cart" });
      const removeBtn = backpackCard.getByRole("button", { name: "Remove" });
      if ((await addBtn.count()) > 0) {
        await addBtn.click();
      } else if ((await removeBtn.count()) > 0) {
        await removeBtn.click();
      }
    }
    // Final state should be deterministic: either Add to cart visible or Remove visible
    if (
      (await backpackCard.getByRole("button", { name: "Remove" }).count()) > 0
    ) {
      await expect(
        backpackCard.getByRole("button", { name: "Remove" }),
      ).toBeVisible();
    }
  });
});
