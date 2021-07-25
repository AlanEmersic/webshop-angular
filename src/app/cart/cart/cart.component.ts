import { Component, OnInit } from '@angular/core';
import { CodeService } from 'src/app/discount-code/code.service';
import { OrderService } from 'src/app/order/order.service';
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
  cartSum: number = 0;
  selectedPaymentMethod!: string;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private codeService: CodeService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this.cartService.getCartProductsById(1).subscribe((items) => {
      this.cartProducts = [];
      this.cartSum = 0;
      items.forEach((item) => {
        this.productService
          .getProductById(item.productId ? item.productId : -1)
          .subscribe((product) => {
            product.id = item.id;
            this.cartProducts.push(product);
            this.cartSum += product.price;
          });
      });
    });
  }

  orderProducts(form: any) {
    this.codeService.getCodeByName(form.value.code).subscribe((code) => {
      const discountCode = code;
      console.log(this.selectedPaymentMethod === 'KARTIČNO' ? 1 : 2);
      const order = {
        paymentMethodId: this.selectedPaymentMethod === 'KARTIČNO' ? 1 : 2,
        date: '20.7.2021.',
        totalPriceWithoutDiscount: this.cartSum,
        totalPriceWithDiscount: this.cartSum,
        cardNumber:
          this.selectedPaymentMethod === 'KARTIČNO'
            ? form.value.cardNumber
            : null,
        email: form.value.email,
        phoneNumber: form.value.phoneNumber,
        deliveryAddress: form.value.deliveryAddress,
        remark: form.value.remark,
        discountCodeId: discountCode !== null ? discountCode.id : -1,
      };

      this.orderService.addOrder(order).subscribe(() => {
        form.reset();
        this.cartProducts.forEach((cp) => {
          this.deleteCartProduct(cp);
        });
      });
    });
  }

  deleteCartProduct(cartProduct: Cart): void {
    this.cartProducts = this.cartProducts?.filter((p) => p !== cartProduct);
    this.cartService.deleteCartProduct(cartProduct).subscribe(() => {
      this.getCartProducts();
    });
  }
}
