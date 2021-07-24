import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/brand/brand.model';
import { BrandService } from 'src/app/brand/brand.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  brands: any[] = [];
  textProductName!: string;
  selectedBrand!: any;

  constructor(
    private productService: ProductService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.brands = [];
    this.products = [];
    this.productService.getProducts().subscribe((products) => {
      products.forEach((product) => {
        this.brandService
          .getBrandById(product.brandId ? product.brandId : -1)
          .subscribe((brand) => {
            const brandProduct = { ...product, brandId: brand.name };
            this.brands.push({ name: brand.name, brandId: product.brandId });
            this.products.push(brandProduct);

            let arr: any[] = [];
            this.brands.forEach((item, index) => {
              if (arr.findIndex((i) => i.name == item.name) === -1) {
                arr.push(item);
              }
            });
            this.brands = arr;
          });
      });
    });
  }

  addProduct(form: any) {
    const brand = this.brands.find((b) => b.name === this.selectedBrand.name);
    const product = {
      name: form.value.name,
      price: form.value.price,
      quantity: form.value.quantity,
      description: form.value.description,
      brandId: brand.brandId,
    };

    this.productService.addProduct(product).subscribe((product) => {
      this.products.push(product);
      form.reset();
      this.getProducts();
    });
  }

  deleteProduct(product: Product): void {
    this.products = this.products?.filter((p) => p !== product);
    // this.productService.deleteProduct(product).subscribe();
  }

  addToCart(product: Product) {
    
  }
}
