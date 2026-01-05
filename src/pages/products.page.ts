import { Page } from "playwright/test";
import { BasePage } from "./base.page";

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openMensOuterwearProducts() {
    await this.page.getByRole("link", { name: "Men's Outerwear" }).click();
  }

  async openLadiesOuterwearProducts() {
    await this.page.getByRole("link", { name: "Ladies Outerwear" }).click();
  }

  async openMensTShirtProducts() {
    await this.page.getByRole("link", { name: "Men's T-Shirts" }).click();
  }

  async openLadiesTShirtProducts() {
    await this.page.getByRole("link", { name: "Ladies T-Shirts" }).click();
  }
}
