import {Controller, Get, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.appService.getProduct(id);
  }

  @Get('')
  getProducts(): any {
    return {
      message: 'Very Hello Word',
    }
  }
}
