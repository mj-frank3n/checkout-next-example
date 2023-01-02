import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { Product } from './checkout/types';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}
  @Post()
  startCheckout(): { id: string } {
    const id = this.checkoutService.createCheckout();
    return {
      id,
    };
  }

  @Put(':id')
  addItem(@Param('id') checkoutId: string, @Body() item: Product): void {
    this.checkoutService.addItem(checkoutId, item);
  }

  @Get('total/:id')
  total(@Param('id') checkoutId: string): { total: string } {
    const formatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    });
    const total = this.checkoutService.total(checkoutId);
    const totalLocalized = formatter.format(total / 100);

    return {
      total: totalLocalized,
    };
  }
}
