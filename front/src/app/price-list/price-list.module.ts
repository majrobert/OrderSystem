import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PriceListRoutingModule } from './price-list-routing.module';
import { PriceProductComponent } from './price-product/price-product.component';
import { PriceTypeComponent } from './price-type/price-type.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { MaterialModule } from '../shared/modules/material.module';
import { EffectsModule } from '@ngrx/effects';
import { PricelistEffects } from './price-list.effects';
import { StoreModule } from '@ngrx/store';
import { pricelistReducer } from './reducers/pricelist.reducer';
import { PriceListResolver } from './resolvers/priceList.resolver';
import { ProductPriceListResolver } from './resolvers/productPriceList.resolver';
import { CategoryResolver } from '../products/resolver/categoryProd.resolver';
import { ProductsEffects } from '../products/products-state/products.effects';
import { productsReducer } from '../products/products-state/products.reducers';


@NgModule({
  declarations: [PriceProductComponent, PriceTypeComponent],
  imports: [
    CommonModule,
    PriceListRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    EffectsModule.forFeature([PricelistEffects]),
    StoreModule.forFeature('pricelist', pricelistReducer ),
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature('products', productsReducer),
  ], providers: [
    PriceListResolver,
    ProductPriceListResolver,
    CategoryResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ]
})
export class PriceListModule { }
