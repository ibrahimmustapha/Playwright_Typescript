import { ProductDetails } from "../productDetails";

export enum Products {
  SAUCE_LABS_BACKPACK = "Sauce Labs Backpack",
  SAUCE_LABS_BIKE_LIGHT = "Sauce Labs Bike Light",
}

export const productCatalog: Record<Products, ProductDetails> = {
  [Products.SAUCE_LABS_BACKPACK]: {
    title: "Sauce Labs Backpack",
    description:
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    price: 29.99,
  },
  [Products.SAUCE_LABS_BIKE_LIGHT]: {
    title: "Sauce Labs Bike Light",
    description:
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    price: 9.99,
  },
};
