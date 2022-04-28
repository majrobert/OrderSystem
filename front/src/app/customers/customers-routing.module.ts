import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCategoryComponent } from './customer-category/customer-category.component';
import { CategoryCustResolver } from './resolver/categoryCust.resolver';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { PriceListResolver } from '../price-list/resolvers/priceList.resolver';
import { CustomerResolver } from './resolver/customer.resolver';
import { CustomersListComponent } from './customers-list/customers-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'prefix' },
  { path: 'customers', component: CustomersListComponent,
  resolve: { pricelist: PriceListResolver, category: CategoryCustResolver , customer: CustomerResolver}},
  { path: 'customers/edit/:customerid', component: CustomerEditComponent },
  { path: 'category', component: CustomerCategoryComponent, resolve: { category: CategoryCustResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
