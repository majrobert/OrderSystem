import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductConfEditComponent } from './product-conf-edit/product-conf-edit.component';
import { CategoryResolver } from '../products/resolver/categoryProd.resolver';
import { ProductConfResolver } from './resolver/ProductConfList.resolver';
import { ProductConfListComponent } from './product-conf-list/product-conf-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'prefix'},
  {path: 'list', component: ProductConfListComponent,
  resolve : { category: CategoryResolver, productConf: ProductConfResolver}},
  {path: 'edit/:productid', component: ProductConfEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductConfRoutingModule { }
