import { PricingRule, Product } from './types';

export class PricingRulesAggregator implements PricingRule {

  constructor(
    private readonly pricingRules: PricingRule[]
  ) {}

  apply(checkoutItems: Product[]): number {
    return this.pricingRules.reduce(
      (totalDiscount, rule) => totalDiscount + rule.apply(checkoutItems),
      0
    );
  }
}
