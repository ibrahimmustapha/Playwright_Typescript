import { expect, Page } from "playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly heading;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator("h1");
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }
}
