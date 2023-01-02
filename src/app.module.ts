import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CheckoutRepository } from './checkout-repository.service';

@Module({
  imports: [],
  controllers: [CheckoutController],
  providers: [CheckoutService, CheckoutRepository],
})
export class AppModule {}
