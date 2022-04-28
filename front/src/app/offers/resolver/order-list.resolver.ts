import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { areOrderListLoad } from '../state/offers.selectors';
import { tap, filter, first, finalize } from 'rxjs/operators';
import { OrderListLoadStart } from '../state/offers.action';

@Injectable()
export class OrderListResolver implements Resolve<any> {
    loading = false;
    data_od = new Date((new Date()).getTime() - 30 * 24 * 60 * 60 * 1000);
    data_do = new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000);
    constructor(private store: Store<AppState>) { }

    resolve(router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {
        return this.store
            .pipe(
                select(areOrderListLoad),
                tap(orderListLoaded => {
                    if (!this.loading && !orderListLoaded) {
                        this.loading = true;
                        this.store.dispatch(OrderListLoadStart({
                            Orderparam: {
                                dateStart: this.data_od, dateEnd: this.data_do,
                                currencyId: '',
                                status: -1, filter: '', sortDirection: 'asc',
                                sortField: 'numberYear', pageIndex: 1, series: '',
                                pageSize: 10
                            }
                        }));
                    }
                }),
                filter(orderListLoaded => orderListLoaded),
                first(),
                finalize(() => this.loading = false));

    }

}
