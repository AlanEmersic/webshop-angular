import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './brand/brand/brand.component';
import { ProductComponent } from './product/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    pathMatch: 'full',    
  },
  {
    path: 'products',
    component: ProductComponent,
    pathMatch: 'full',    
  },
  {
    path: 'brands',
    component: BrandComponent,
    pathMatch: 'full',    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
