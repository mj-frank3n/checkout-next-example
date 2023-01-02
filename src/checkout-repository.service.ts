import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CustomerCheckout } from './checkout/customer-checkout';
import {
  PricingRuleFactory,
  PricingRuleType,
} from './checkout/pricing-rules/pricing-rule-factory';

const inMemoryStorage: Record<string, CustomerCheckout> = {};

@Injectable()
export class CheckoutRepository {
  create(): string {
    const checkoutId = v4();
    inMemoryStorage[checkoutId] = new CustomerCheckout(
      PricingRuleFactory.create({
        customerName: 'Test Customer',
        config: [
          {
            type: PricingRuleType.FIXED_PRICE,
            //THIS SETS UP PRODUCT WITH ID 1 TO BE DISCOUNTED TO 1$
            specification: {
              productId: '1',
              fixedPrice: 100,
            },
          },
        ],
      }),
    );
    return checkoutId;
  }

  get(checkoutId: string): CustomerCheckout {
    return inMemoryStorage[checkoutId];
  }
}
