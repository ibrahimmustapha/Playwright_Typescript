import { ProductDetails } from "../productDetails";

export enum Products {
  SAUCE_LABS_BACKPACK = "Sauce Labs Backpack",
  SAUCE_LABS_BIKE_LIGHT = "Sauce Labs Bike Light",
}

export const productCatalog: Record<Products, ProductDetails> = {
  [Products.SAUCE_LABS_BACKPACK]: new ProductDetails(
    "Sauce Labs Backpack",
    "Carry all the things with the sleek, streamlined Sly Pack.",
    29.99
  ),
  [Products.SAUCE_LABS_BIKE_LIGHT]: new ProductDetails(
    "Sauce Labs Bike Light",
    "A red light built for speed and visibility.",
    9.99
  ),
};
