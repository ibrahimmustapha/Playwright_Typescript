import test, { expect } from "playwright/test";
import { LoginPage } from "../pages/login.page";
import {
  emailOnlyUser,
  standUser,
  unauthorizedUser,
} from "../entity/data/users";
import { logger } from "../utils/logger";
import { HomePage } from "../pages/home.page";

test("Login as user", async ({ page }) => {
  logger.info("Test started", { testName: "Login as user" });

  const loginPage = new LoginPage(page);
  await loginPage.goto("https://www.saucedemo.com/");
  await loginPage.login(standUser);
  const homePage = new HomePage(page);
  await homePage.verifyTitle();
  await loginPage.verifyUserLoggedInSuccessfully();

  logger.info("Test Completed", { testName: "Login as user" });
});

test("Login with wrong credentials", async ({ page }) => {
  logger.info("Test started", { testName: "Login with wrong credentials" });

  const loginPage = new LoginPage(page);
  await loginPage.goto("https://www.saucedemo.com/");
  await loginPage.login(unauthorizedUser);
  await loginPage.verifyUserLoginWasNotSuccessful();

  logger.info("Test Completed", { testName: "Login with wrong credentials" });
});

test("Login with only username", async ({ page }) => {
  logger.info("Test started", { testName: "Login with only username" });

  const loginPage = new LoginPage(page);
  await loginPage.goto("https://www.saucedemo.com/");
  await loginPage.login(emailOnlyUser);
  await loginPage.verifyUserLoginWasNotSuccessfulWithOnlyUsername();

  logger.info("Test Completed", { testName: "Login with only username" });
});
