import { expect, Page } from "playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly heading;
  readonly menuBar;
  readonly logoutButton;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator("h1");
    this.menuBar = page.locator("#react-burger-menu-btn");
    this.logoutButton = page.locator("#logout_sidebar_link");
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  async logoutUser() {
    await this.menuBar.click();
    await this.logoutButton.click();
  }

  async verifyUserLoggedOut() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com");
  }
}
