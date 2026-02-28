import { test } from "@playwright/test";
import { standardUser } from "../entity/data/users";
import { productCatalog, Products } from "../entity/data/products";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { ProductsPage } from "../pages/products.page";
import { ProductDetailsPage } from "../pages/productDetails.page";
import { logger } from "../utils/logger";

test.describe("Home and Products", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("/");
    await loginPage.login(standardUser);
  });

  test("Inventory page shows expected products", async ({ page }) => {
    logger.info("Test started", {
      testName: "Inventory page shows expected products",
    });

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.verifyInventoryPageLoaded();
    await homePage.verifyTitle();
    await productsPage.verifyProductDisplayed(Products.SAUCE_LABS_BACKPACK);
    await productsPage.verifyProductPrice(
      Products.SAUCE_LABS_BACKPACK,
      productCatalog[Products.SAUCE_LABS_BACKPACK].price
    );

    logger.info("Test completed", {
      testName: "Inventory page shows expected products",
    });
  });

  test("Product details page shows correct data", async ({ page }) => {
    logger.info("Test started", {
      testName: "Product details page shows correct data",
    });

    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await productsPage.openProduct(Products.SAUCE_LABS_BACKPACK);
    await productDetailsPage.verifyProductDetails(
      productCatalog[Products.SAUCE_LABS_BACKPACK]
    );

    logger.info("Test completed", {
      testName: "Product details page shows correct data",
    });
  });
});
