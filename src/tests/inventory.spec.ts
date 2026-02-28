import { test } from "@playwright/test";
import { standardUser } from "../entity/data/users";
import { productCatalog, Products } from "../entity/data/products";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { ProductsPage } from "../pages/products.page";
import { ProductDetailsPage } from "../pages/productDetails.page";
import { logger } from "../utils/logger";

test.describe("Inventory", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("/");
    await loginPage.login(standardUser);
  });

  test("User can add a product to cart from inventory", async ({ page }) => {
    logger.info("Test started", {
      testName: "User can add a product to cart from inventory",
    });

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.verifyInventoryPageLoaded();
    await productsPage.addProductToCart(Products.SAUCE_LABS_BACKPACK);
    await productsPage.verifyProductAddedToCart(Products.SAUCE_LABS_BACKPACK);
    await productsPage.verifyCartBadgeCount(1);
    await productsPage.openCart();
    await productsPage.verifyProductInCart(Products.SAUCE_LABS_BACKPACK);

    logger.info("Test completed", {
      testName: "User can add a product to cart from inventory",
    });
  });

  test("User can sort products by price low to high", async ({ page }) => {
    logger.info("Test started", {
      testName: "User can sort products by price low to high",
    });

    const productsPage = new ProductsPage(page);

    await productsPage.sortBy("Price (low to high)");
    await productsPage.verifyPricesAreSortedLowToHigh();

    logger.info("Test completed", {
      testName: "User can sort products by price low to high",
    });
  });

  test("User can open product details and go back to products", async ({ page }) => {
    logger.info("Test started", {
      testName: "User can open product details and go back to products",
    });

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await productsPage.openProduct(Products.SAUCE_LABS_BIKE_LIGHT);
    await productDetailsPage.verifyProductDetails(
      productCatalog[Products.SAUCE_LABS_BIKE_LIGHT]
    );
    await productDetailsPage.goBackToProducts();
    await homePage.verifyInventoryPageLoaded();

    logger.info("Test completed", {
      testName: "User can open product details and go back to products",
    });
  });
});
