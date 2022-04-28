import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OfferslistComponent } from './offerslist/offerslist.component';
import { OfferEditHeaderComponent } from './offer-edit-header/offer-edit-header.component';
import { PartialsModule } from '../shared/modules/partials-module/partials-module';
import { PartialComponentModule } from '../shared/partial-component/partial-component.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { LayoutUtilsService } from '../shared/modules/partials-module/LayoutUtilsService';
import { EffectsModule } from '@ngrx/effects';
import { CustomersEffects } from '../customers/customers.effects';
import { StoreModule } from '@ngrx/store';
import { customersReducer } from '../customers/reducers/customers.reducer';
import { PricelistEffects } from '../price-list/price-list.effects';
import { pricelistReducer } from '../price-list/reducers/pricelist.reducer';
import { PriceListResolver } from '../price-list/resolvers/priceList.resolver';
import { CategoryResolver } from '../products/resolver/categoryProd.resolver';
import { CategoryCustResolver } from '../customers/resolver/categoryCust.resolver';
import { OffersEffects } from './state/offers.effects';
import { offersReducer } from './state/offers.reducers';
import { CurrencyResolver } from './resolver/Currency.resolver';
import { CurrencyComponent } from './currency/currency.component';
import { ActionNotificationComponent, DeleteEntityDialogComponent } from '../shared/modules/partials-module/content';
import { OrderListResolver } from './resolver/order-list.resolver';
import { TranslateModule } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';
import { OfferEditComponent } from './offer-edit/offer-edit.component';
import { OfferHeaderComponent } from './partial/offer-header/offer-header.component';
import { OfferHeaderAddModalComponent } from './offer-header-add-modal/offer-header-add-modal.component';
import { OrderResolver } from './resolver/order.resolver';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfferAddElementComponent } from './partial/offer-add-element/offer-add-element.component';
import { OfferAddElementConfigComponent } from './partial/offer-add-element-config/offer-add-element-config.component';
import { ProductsEffects } from '../products/products-state/products.effects';
import { productsReducer } from '../products/products-state/products.reducers';
import { ProductPriceListResolver } from '../price-list/resolvers/productPriceList.resolver';
import { OrderPriceListResolver } from './resolver/order-price-list.resolver';
import { OfferAddElemModalComponent } from './partial/offer-add-elem-modal/offer-add-elem-modal.component';
import { OfferModElemModalComponent } from './partial/offer-mod-elem-modal/offer-mod-elem-modal.component';
import { productConfReducer } from '../product-conf/state/procuctConf.reducer';
import { ProductsConfEffects } from '../product-conf/state/productConf.effects';
import { OfferEditConfComponent } from './offer-edit-conf/offer-edit-conf.component';
import { OrderElemConfResolver } from './resolver/order-elem-conf';
import { OfferHandModElemModalComponent } from './partial/offer-hand-mod-elem-modal/offer-hand-mod-elem-modal.component';
import { OfferViewComponent } from './offer-view/offer-view.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
registerLocaleData(localePl);
@NgModule({
  declarations: [OfferslistComponent,
    OfferEditHeaderComponent, CurrencyComponent,
    OfferEditComponent, OfferHeaderComponent,
    OfferHeaderAddModalComponent,
    OfferAddElementComponent,
    OfferAddElementConfigComponent,
    OfferAddElemModalComponent,
    OfferModElemModalComponent,
    OfferEditConfComponent,
    OfferHandModElemModalComponent,
    OfferViewComponent],
  imports: [
    CommonModule,
    OffersRoutingModule,
    PartialsModule,
    PartialComponentModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MaterialModule,
    NgbModule,
    CKEditorModule,

    EffectsModule.forFeature([OffersEffects]),
    StoreModule.forFeature('offers', offersReducer),
    EffectsModule.forFeature([CustomersEffects]),
    StoreModule.forFeature('customers', customersReducer),
    EffectsModule.forFeature([PricelistEffects]),
    StoreModule.forFeature('pricelist', pricelistReducer),
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('productconf', productConfReducer),
    EffectsModule.forFeature([ProductsConfEffects])
  ], providers: [
    OrderResolver,
    OrderListResolver,
    PriceListResolver,
    CategoryResolver,
    CategoryCustResolver,
    OrderPriceListResolver,
    CurrencyResolver,
    OrderElemConfResolver,
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
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
    OfferHeaderAddModalComponent,
    OfferModElemModalComponent,
    ActionNotificationComponent,
    DeleteEntityDialogComponent,
    OfferAddElemModalComponent,
    OfferHandModElemModalComponent 
  ]
})
export class OffersModule { }
