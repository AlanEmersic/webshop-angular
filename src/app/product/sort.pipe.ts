import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(products: any[], text: string): any[] {
    if (!products || !text) {
      return products;
    }

    return products.sort((a,b) => a.text.toLowerCase.localeCompare(b.text.toLowerCase));    
  }
}
