import { PricingRule, Product } from '../types.js';

export interface FreeItemsRuleSpecification {
  productId: string,
  applicableToItemCount: number;
  freeItemsCountToGrant: number;
}

export class FreeItemsRule implements PricingRule {
  constructor(private readonly config: FreeItemsRuleSpecification) {}

  apply(items: Product[]): number {
    const applicableItems = items.filter(({id}) => id === this.config.productId);
    const applicableItemsCount = applicableItems.length;

    if (!applicableItems.every(applicableItem => applicableItems[0].retailPrice === applicableItem.retailPrice)) {
      throw new Error(`Product ${this.config.productId} is priced inconsistently. Cannot apply free items pricing rule.`);
    }

    if (applicableItemsCount === 0) {
      return 0;
    }

    if (applicableItemsCount < this.config.applicableToItemCount) {
      return 0;
    }

    const remainderItems = applicableItemsCount % this.config.applicableToItemCount;
    return ((applicableItemsCount - remainderItems) / this.config.applicableToItemCount) * applicableItems[0].retailPrice;
  }
}
