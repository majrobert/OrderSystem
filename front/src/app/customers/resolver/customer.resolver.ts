import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { areCustomersLoaded } from '../customers.selectors';
import { first, finalize, tap, filter } from 'rxjs/operators';
import { CustomersLoadActionStart } from '../customers.action';

@Injectable()
export class CustomerResolver implements Resolve<any> {
    loading = false;
    constructor(private store: Store<AppState>) {}
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store
        .pipe(
            select(areCustomersLoaded),
           tap(customersLoaded => {
               if (!this.loading && !customersLoaded) {
                   this.loading = true;
                this.store.dispatch(CustomersLoadActionStart({
                    customerspar: {filter: '', status: -1,
                    category: '', pricegroup: '',  sortDirection: 'asc',
                    sortField: 'name', pageIndex: 1,
                    pageSize: 10}
                }));
               }
        }),
        filter(customersLoaded => customersLoaded),
            first(),
            finalize(() => this.loading = false)
        );
    }
}
