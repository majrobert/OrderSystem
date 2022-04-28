import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { areProductPriceLoaded } from '../price-list.selectors';
import { tap, filter, first, finalize } from 'rxjs/operators';
import { ProductPriceLoadAction } from '../price-list.action';


@Injectable()
export class ProductPriceListResolver implements Resolve<any> {
    loading = false;
    constructor(private store: Store<AppState>) { }
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return this.store.pipe(
            select(areProductPriceLoaded),
            tap(productPriceLoaded => {
                if (!this.loading && !productPriceLoaded) {
                    this.loading = true;
                    this.store.dispatch(ProductPriceLoadAction({
                        producPriceParams: {
                            category: '', priceType: '', filter: '', sortDirection: 'asc',
                            sortField: 'name', pageIndex: 1,
                            pageSize: 10
                        }
                    }));
                }
            }),
            filter(productPriceLoaded => productPriceLoaded),
            first(),
            finalize(() => this.loading = false)
        );
    }
}
