import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdCategoryComponent } from './prod-category/prod-category.component';
import { CategoryResolver } from './resolver/categoryProd.resolver';
import { ProductResolver } from './resolver/product.resolver';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { PriceListResolver } from '../price-list/resolvers/priceList.resolver';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'prefix' },
  {path: 'products', component: ProductListComponent ,
  resolve : { products: ProductResolver, category: CategoryResolver }},
  {path: 'products/edit/:productid', component: ProductEditComponent},
  {path: 'products/view/:productid', component: ProductViewComponent, resolve: {priceType: PriceListResolver}},
  {path: 'category', component: ProdCategoryComponent, resolve : { category: CategoryResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
