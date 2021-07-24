import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.model';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {
  transform(products: Product[], text: string): Product[] {
    if (!products || !text) {
      return products;
    }

    return products.filter((product) => {
      return product.name.toLowerCase().includes(text.toLowerCase());
    });
  }
}
