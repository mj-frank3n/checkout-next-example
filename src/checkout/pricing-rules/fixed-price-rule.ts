import { PricingRule, Product } from '../types';

export interface FixedPriceRuleSpecification {
  productId: string,
  fixedPrice: number;
}

export class FixedPriceRule implements PricingRule {
  constructor(private readonly config: FixedPriceRuleSpecification) {}

  apply(items: Product[]): number {
    const applicableItems = items.filter(({id}) => id === this.config.productId);

    if (!applicableItems.every(applicableItem => applicableItems[0].retailPrice === applicableItem.retailPrice)) {
      throw new Error(`Product ${this.config.productId} is priced inconsistently. Cannot apply discount pricing rule.`);
    }

    if (!applicableItems.length) {
      return 0;
    }

    if (applicableItems[0].retailPrice < this.config.fixedPrice) {
      return 0;
    }

    return applicableItems.length * (applicableItems[0].retailPrice - this.config.fixedPrice);
  }
}
