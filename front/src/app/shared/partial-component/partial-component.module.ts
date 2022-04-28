import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { MaterialModule } from '../modules/material.module';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductCustomComponent } from './components/product-custom/product-custom.component';


@NgModule({
  declarations: [
    ProductsComponent,
    CustomersComponent,
    ProductCustomComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [ProductsComponent, CustomersComponent, ProductCustomComponent]
})
export class PartialComponentModule { }
