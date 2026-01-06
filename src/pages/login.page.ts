import { expect, Page } from "playwright/test";
import { BasePage } from "./base.page";
import { UserDetails } from "../entity/userDetails";
import { logger } from "../utils/logger";
import { ErrorMessage } from "../entity/data/errorrMessages";

export class LoginPage extends BasePage {
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  }

  async login(userDetails: UserDetails) {
    logger.info("Login as a user");
    if (userDetails.username != null || userDetails.username != "") {
      await this.usernameInput.fill(userDetails.username);
    }

    if (userDetails.password != null || userDetails.password != "") {
      await this.passwordInput.fill(userDetails.password);
    }

    await this.loginButton.click();
  }

  async verifyUserLoggedInSuccessfully() {
    logger.info("verifying login is successful");
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.page.locator(".app_logo")).toHaveText(/Swag Labs/);
    logger.info("Login is successful");
  }

  async verifyUserLoginWasNotSuccessful() {
    logger.info("verifying login was not successful");
    await expect(this.page).toHaveURL("https://www.saucedemo.com");
    await expect(this.page.locator(".error-message-container")).toHaveText(
      ErrorMessage.USERNAME_AND_PASSWORD_NOT_AVAILABLE
    );
    logger.info("Login was not successful");
  }

  async verifyUserLoginWasNotSuccessfulWithOnlyUsername() {
    logger.info("verifying login was not successful with only username");
    await expect(this.page).toHaveURL("https://www.saucedemo.com");
    await expect(this.page.locator(".error-message-container")).toHaveText(
      ErrorMessage.PASSWORD_IS_REQUIRED
    );
    logger.info("Login was not successful with only username");
  }
}
