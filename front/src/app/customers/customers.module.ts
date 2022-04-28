import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from '../shared/partial-component/components/customers/customers.component';
import { CustomerCategoryComponent } from './customer-category/customer-category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { customersReducer } from './reducers/customers.reducer';
import { CustomersEffects } from './customers.effects';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { PartialsModule } from '../shared/modules/partials-module/partials-module';
import { LayoutUtilsService } from '../shared/modules/partials-module/LayoutUtilsService';
import { ActionNotificationComponent,
   DeleteEntityDialogComponent, 
   FetchEntityDialogComponent, 
   UpdateStatusDialogComponent } from '../shared/modules/partials-module/content';
import { CategoryCustResolver } from './resolver/categoryCust.resolver';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { pricelistReducer } from '../price-list/reducers/pricelist.reducer';
import { PricelistEffects } from '../price-list/price-list.effects';
import { PriceListResolver } from '../price-list/resolvers/priceList.resolver';
import { CustomerResolver } from './resolver/customer.resolver';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { PartialComponentModule } from '../shared/partial-component/partial-component.module';

@NgModule({
  declarations: [CustomerCategoryComponent, CustomerEditComponent, CustomersListComponent],
  imports: [
    MatDialogModule,
    PartialsModule,
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PartialComponentModule,
    EffectsModule.forFeature([CustomersEffects]),
    StoreModule.forFeature('customers', customersReducer),
    EffectsModule.forFeature([PricelistEffects]),
    StoreModule.forFeature('pricelist', pricelistReducer )
  ], providers: [
    CategoryCustResolver,
    PriceListResolver,
    CustomerResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        height: 'auto',
        width: '900px'
      }
    },
    LayoutUtilsService,
  ], entryComponents: [
    ActionNotificationComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent,
  ]
})
export class CustomersModule { }
