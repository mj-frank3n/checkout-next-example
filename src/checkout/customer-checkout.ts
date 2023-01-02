import { Checkout, PricingRule, Product } from './types';

export class CustomerCheckout implements Checkout {
  private items: Product[] = [];
  constructor(private pricingRules?: PricingRule) {}

  add(item: Product): void {
    this.items = [...this.items, item];
  }

  total(): number {
    let total = this.items.reduce(
      (total, checkoutItem) => total + checkoutItem.retailPrice,
      0,
    );

    if (this.pricingRules) {
      total = total - this.pricingRules.apply(this.items);
    }

    return total;
  }
}
