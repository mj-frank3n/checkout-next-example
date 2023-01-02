import { Injectable } from '@nestjs/common';

@Injectable()
export class AppRepository {
  createCheckout(): string {
    return 'Hello World!';
  }
}
