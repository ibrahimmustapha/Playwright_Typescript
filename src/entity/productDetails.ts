export class ProductDetails {
  private title: string;
  private description: string;
  private price: number;

  constructor(title: string, description: string, price: number) {
    this.title = title;
    this.description = description;
    this.price = price;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getPrice(): number {
    return this.price;
  }
}
