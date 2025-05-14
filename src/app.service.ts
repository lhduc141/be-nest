import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getProduct(id: number) {
    return 'Product ' + id;
  }
}
