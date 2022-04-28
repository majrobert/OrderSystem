import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { arePricelistTypeLoaded } from '../price-list.selectors';
import { first, finalize, tap, filter } from 'rxjs/operators';
import { loadAllPriceListType } from '../price-list.action';

@Injectable()
export class PriceListResolver implements Resolve<any> {
    loading = false;
    constructor(private store: Store<AppState>) {}
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
        return this.store.pipe(
            select(arePricelistTypeLoaded),
            tap(productListTypeLoaded => {
                if (!this.loading && !productListTypeLoaded) {
                    this.loading = true;
                    this.store.dispatch(loadAllPriceListType());
                }
            }),
            filter(productListTypeLoaded => productListTypeLoaded),
            first(),
            finalize(() => this.loading = false)
        );
    }
}
