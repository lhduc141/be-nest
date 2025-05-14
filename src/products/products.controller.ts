import {Body, Controller, Get, Post} from '@nestjs/common';
import {ProductsService} from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    getProducts(): any {
        return 'Product Controller';
    }

    @Post()
    addProduct(@Body('title') pTitle: string, @Body('price') pPrice: number, @Body('desc') pDesc: string) {
        const productId = this.productsService.insertProducts(pTitle, pDesc, pPrice);

        return {
            message: `Product Controller added ${productId} successfully`,
        };
    }
}
