import test, { expect } from "playwright/test";
import { LoginPage } from "../pages/login.page";
import { standUser, unauthorizedUser } from "../entity/data/users";
import { logger } from "../utils/logger";

test("Login as user", async ({ page }) => {
  logger.info("Test started", { testName: "Login as user" });

  const loginPage = new LoginPage(page);
  await loginPage.goto("https://www.saucedemo.com/");
  await loginPage.login(standUser);
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
