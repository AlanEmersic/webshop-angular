import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/brand/brand.model';
import { BrandService } from 'src/app/brand/brand.service';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  brands!: Brand[];
  textProductName!: string;
  selectedBrand!: Brand;
  // selectedSort!: string;

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
  }

  getProducts(sort = '') {
    this.productService.getProducts().subscribe((products) => {
      this.products = [];
      products.forEach((product) => {
        this.brandService
          .getBrandById(product.brandId ? product.brandId : -1)
          .subscribe((brand) => {
            const brandProduct = { ...product, brandId: brand.name };
            this.products.push(brandProduct);
            if (sort !== '') {
              const arr = this.products.sort((a, b) =>
                a.selectedSort
                  ?.toLowerCase()
                  ?.localeCompare(b.selectedSort?.toLowerCase())
              );
              this.products = arr;
            }
          });
      });
    });
  }

  sortProducts(value: string) {
    console.log(value);
    this.getProducts(value);
  }

  getBrands() {
    this.brandService.getBrands().subscribe((brands) => (this.brands = brands));
  }

  addProduct(form: any) {
    const product = {
      name: form.value.name,
      price: form.value.price,
      quantity: form.value.quantity,
      description: form.value.description,
      brandId: this.selectedBrand.id,
    };

    this.productService.addProduct(product).subscribe((product) => {
      this.products.push(product);
      form.reset();
      this.getProducts();
    });
  }

  deleteProduct(product: Product): void {
    this.products = this.products?.filter((p) => p !== product);
    this.productService.deleteProduct(product).subscribe();
  }

  addToCart(product: Product) {
    this.products = this.products?.filter((p) => p !== product);
    const cartProduct = { productId: product.id, orderId: 1 };
    this.cartService.addCartProduct(cartProduct).subscribe(() => {
      this.getProducts();
    });
  }
}
