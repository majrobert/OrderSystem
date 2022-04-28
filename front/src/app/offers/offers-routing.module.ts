import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferslistComponent } from './offerslist/offerslist.component';
import { OfferEditHeaderComponent } from './offer-edit-header/offer-edit-header.component';
import { PriceListResolver } from '../price-list/resolvers/priceList.resolver';
import { CategoryCustResolver } from '../customers/resolver/categoryCust.resolver';
import { CurrencyResolver } from './resolver/Currency.resolver';
import { CurrencyComponent } from './currency/currency.component';
import { OrderListResolver } from './resolver/order-list.resolver';
import { OfferEditComponent } from './offer-edit/offer-edit.component';
import { OrderResolver } from './resolver/order.resolver';
import { CategoryResolver } from '../products/resolver/categoryProd.resolver';
import { OrderPriceListResolver } from './resolver/order-price-list.resolver';
import { OfferAddElementComponent } from './partial/offer-add-element/offer-add-element.component';
import { OfferEditConfComponent } from './offer-edit-conf/offer-edit-conf.component';
import { OrderElemConfResolver } from './resolver/order-elem-conf';
import { OfferViewComponent } from './offer-view/offer-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'oferslist', pathMatch: 'prefix' },
  {
    path: 'offerslist', component: OfferslistComponent,
    resolve: { order: OrderListResolver, currency: CurrencyResolver }
  },
  { path: 'currency', component: CurrencyComponent, resolve: { currency: CurrencyResolver } },
  {
    path: 'edit/:offerid', component: OfferEditComponent,
    resolve: { elem: OrderResolver, category: CategoryResolver }
  },
  {
    path: 'editc/:offerid/:elemconfId', component: OfferEditConfComponent,
    resolve: { elemConf: OrderElemConfResolver }
  },
  {
    path: 'edith/:offerid', component: OfferEditHeaderComponent,
    resolve: {
      category: CategoryCustResolver,
      currency: CurrencyResolver,
      pricelist: PriceListResolver,
    }
  },
  {
    path: 'view/:offerid', component: OfferViewComponent,
    resolve: { elem: OrderResolver, category: CategoryResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
