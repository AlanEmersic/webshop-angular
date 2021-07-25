import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';
import { CartService } from '../cart.service';
import { Cart } from './cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this.cartService.getCartProducts().subscribe((items) => {
      this.cartProducts = [];
      items.forEach((item) => {
        this.productService
          .getProductById(item.productId ? item.productId : -1)
          .subscribe((product) => {
            product.id = item.id;
            this.cartProducts.push(product);            
          });
      });
    });
  }

  order() {}

  deleteCartProduct(cartProduct: Cart): void {
    this.cartProducts = this.cartProducts?.filter((p) => p !== cartProduct);
    this.cartService.deleteCartProduct(cartProduct).subscribe();
  }
}
