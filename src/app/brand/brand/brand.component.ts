import { Component, OnInit } from '@angular/core';
import { Brand } from '../brand.model';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands!: Brand[];

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService
      .getBrands()
      .subscribe((brands) => (this.brands = brands));
  }

  addBrand(form: any) {
    const brand = {
      name: form.value.name    
    };
    
    this.brandService.addBrand(brand).subscribe((brand) => {
      this.brands.push(brand);
      form.reset();
      this.getBrands();
    });
  }
}
