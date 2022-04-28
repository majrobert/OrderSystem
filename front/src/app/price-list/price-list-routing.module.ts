import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceProductComponent } from './price-product/price-product.component';
import { PriceTypeComponent } from './price-type/price-type.component';
import { PriceListResolver } from './resolvers/priceList.resolver';
import { ProductPriceListResolver } from './resolvers/productPriceList.resolver';
import { CategoryResolver } from '../products/resolver/categoryProd.resolver';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'prefix'},
  {path: 'products', component: PriceProductComponent,
   resolve: {
     productPrice: ProductPriceListResolver,
     category: CategoryResolver, priceType: PriceListResolver}},
  {path: 'type', component: PriceTypeComponent, resolve: {priceType: PriceListResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceListRoutingModule { }
