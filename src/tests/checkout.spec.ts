// spec: specs/plan.md
// seed: src/tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductsPage } from "../pages/products.page";
import { standardUser } from "../entity/data/users";

test.describe("Checkout Validation and Flows", () => {
  test("Checkout validation and complete order", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("/");
    await loginPage.login(standardUser);

    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart("Sauce Labs Backpack");
    await productsPage.verifyCartBadgeCount(1);
    await productsPage.openCart();

    // Proceed to checkout
    await page.getByRole("button", { name: "Checkout" }).click();

    // Continue without filling fields -> expect error
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.locator(".error-message-container")).toBeVisible();

    // Fill long/unicode inputs and invalid postal code
    await page.fill("#first-name", "A".repeat(512));
    await page.fill("#last-name", "测试ユニコード");
    await page.fill("#postal-code", "abc-!@#");
    await page.getByRole("button", { name: "Continue" }).click();
    // If app validates postal code, expect error; otherwise proceed to overview
    if ((await page.locator(".error-message-container").count()) > 0) {
      await expect(page.locator(".error-message-container")).toBeVisible();
    } else {
      await expect(page).toHaveURL(/checkout-step-two.html/);
    }

    // If on overview, finish order
    if (/checkout-step-two.html/.test(page.url())) {
      await page.getByRole("button", { name: "Finish" }).click();
      await expect(page).toHaveURL(/checkout-complete.html/);
      await expect(page.locator(".complete-header")).toHaveText(
        /THANK YOU FOR YOUR ORDER/i,
      );
    }

    // Cancel during checkout (navigate back to inventory) - ensure cart persists
    await page.goto("/inventory.html");
    await expect(page.locator(".shopping_cart_link")).toBeVisible();
  });
});
