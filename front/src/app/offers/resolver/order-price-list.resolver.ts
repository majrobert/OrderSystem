import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { currentOderId, getOffer } from '../state/offers.selectors';
import { take, tap, filter, first, finalize } from 'rxjs/operators';
import { Order } from '../model/order';
import { areProductPriceLoaded } from 'src/app/price-list/price-list.selectors';
import { ProductPriceOrderCustomerLoad } from 'src/app/price-list/price-list.action';

@Injectable()
export class OrderPriceListResolver implements Resolve<any> {
  loading = false;
  lastorder: string;
  offer: Order;
  constructor(private store: Store<AppState>) { }
  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const offerId = router.paramMap.get('offerid');
    this.store.pipe(select(currentOderId), take(1)).subscribe(
      data => this.lastorder = data
    );
    this.store.pipe(select(getOffer(offerId)),
      take(1)).subscribe(
        data => {
          this.offer = data;
        }
      );
    return this.store.pipe(
      select(areProductPriceLoaded),
      tap(arePriceLoad => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(ProductPriceOrderCustomerLoad
            ({
              producPriceParams: {
                category: '', filter: '',
                sortDirection: 'asc',
                sortField: 'name', pageIndex: 1,
                pageSize: 10, priceType: this.offer.customer.priceId,
                orderId: this.offer.id, custonerId: this.offer.customerId
              }
            }));
        }
      }),
      filter(arePriceLoad => arePriceLoad),
      first(),
      finalize(() => this.loading = false)
    );
  }
}
