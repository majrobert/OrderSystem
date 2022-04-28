import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { areCategoryCustLoaded} from '../customers.selectors';
import { tap, filter, first, finalize } from 'rxjs/operators';
import { loadAllCategoryC } from '../customers.action';

import { loadAllPriceListType } from 'src/app/price-list/price-list.action';

@Injectable()
export class CategoryCustResolver implements Resolve<any> {
    loading = false;
    constructor(private store: Store<AppState>) {}

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
       return this.store
            .pipe(
                select(areCategoryCustLoaded),
                tap( categoryLoaded => {
                    if (!this.loading && !categoryLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllCategoryC());
                    }
                }),
                filter(categoryLoaded => categoryLoaded),
                first(),
                finalize(() => this.loading = false)
            );
    }
}
