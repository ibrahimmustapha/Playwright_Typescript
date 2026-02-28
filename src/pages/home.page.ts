import { expect, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly appLogo;
  readonly pageTitle;
  readonly menuButton;
  readonly logoutButton;

  constructor(page: Page) {
    super(page);
    this.appLogo = page.locator(".app_logo");
    this.pageTitle = page.locator(".title");
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.logoutButton = page.locator("#logout_sidebar_link");
  }

  async verifyTitle() {
    await expect(this.appLogo).toHaveText("Swag Labs");
  }

  async verifyInventoryPageLoaded() {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.pageTitle).toHaveText("Products");
  }

  async logoutUser() {
    await this.menuButton.click();
    await this.logoutButton.click();
  }

  async verifyUserLoggedOut() {
    await expect(this.page).toHaveURL(/https:\/\/www\.saucedemo\.com\/?$/);
  }
}
