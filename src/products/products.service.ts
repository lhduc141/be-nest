import { Injectable } from '@nestjs/common';
import {Product} from "./products.model";

@Injectable()
export class ProductsService {
    product: Product[] = [];

    insertProducts(tile: string, desc: string, price: number) {
        const id = new Date().toString()
        const newProducts = new Product(id, tile , desc, price);
        this.product.push(newProducts);
        return id;
    }
}
