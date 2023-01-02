import { CustomerPricing, PricingRule } from '../types';
import { FixedPriceRule, FixedPriceRuleSpecification } from './fixed-price-rule';
import { FreeItemsRule, FreeItemsRuleSpecification } from './free-items-rule';
import { PricingRulesAggregator } from '../pricing-rules-aggregator';

export enum PricingRuleType {
  FREE_ITEMS = 'FREE_ITEMS',
  FIXED_PRICE = 'FIXED_PRICE'
}

export const PricingRuleFactory = {
  create({ config }: CustomerPricing): PricingRule {
    const rulesCountByProductId = config.reduce((appliedProductIds, rule) => {
      return appliedProductIds[rule.specification.productId] ? {
        ...appliedProductIds,
        [rule.specification.productId]: appliedProductIds[rule.specification.productId] + 1
      } : {
        ...appliedProductIds,
        [rule.specification.productId]: 1
      };
    }, {});

    if (Object.values(rulesCountByProductId).some(rulesAppliedToSingleProductCount => rulesAppliedToSingleProductCount > 1)) {
      throw new Error('Multiple pricing rules per product are not allowed');
    }

    const customerPricingRules = config.map((rule) => {
      switch (rule.type) {
        case PricingRuleType.FREE_ITEMS:
          return new FreeItemsRule(rule.specification as FreeItemsRuleSpecification);
        case PricingRuleType.FIXED_PRICE:
          return new FixedPriceRule(rule.specification as FixedPriceRuleSpecification);
        default:
          throw new Error(`Cannot instantiate ${rule.type} pricing rule. ${rule.type} is not supported.`);
      }
    });

    return new PricingRulesAggregator(customerPricingRules);
  }
};
