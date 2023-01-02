import { Injectable } from '@nestjs/common';
import { CheckoutRepository } from './checkout-repository.service';
import { Product } from './checkout/types';

@Injectable()
export class CheckoutService {
  constructor(private readonly checkoutRepository: CheckoutRepository) {}
  createCheckout(): string {
    return this.checkoutRepository.create();
  }

  addItem(checkoutId: string, item: Product): void {
    const checkout = this.checkoutRepository.get(checkoutId);
    checkout.add(item);
  }

  total(checkoutId: string): number {
    const checkout = this.checkoutRepository.get(checkoutId);
    return checkout.total();
  }
}
