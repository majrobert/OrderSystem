import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { ProductsLoadAction } from '../products-state/products.action';
import { areProductsLoaded } from '../products-state/products.selectors';
import { tap, filter, first, finalize } from 'rxjs/operators';

@Injectable()
export class ProductResolver implements Resolve<any> {
    loading = false;
    constructor(private store: Store<AppState>) { }
    resolve(router: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<any> {
        return this.store
            .pipe(
                select(areProductsLoaded),
                tap(productLoaded => {
                    if (!this.loading && !productLoaded) {
                        this.loading = true;
                        this.store.dispatch(ProductsLoadAction
                            ({product: { category: '' , status: -1 , filter: '', sortDirection: 'asc',
                            sortField: 'name', pageIndex: 1,
                            pageSize: 10}}));
                    }
                }),
                filter(productloades => productloades),
                first(),
                finalize(() => this.loading = false)
            );
    }
}
