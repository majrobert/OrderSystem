import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter, first, finalize } from 'rxjs/operators';
import { ProductsConfigListLoadStart } from '../state/procuctConf-action';
import { areProductConfLoaded } from '../state/productConf.selector';

@Injectable()
export class ProductConfResolver implements Resolve<any> {
    loading = false;
    constructor(private store: Store<AppState>) {}
resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
return this.store
        .pipe(
            select(areProductConfLoaded),
            tap(productConfLoaded => {
                if(!this.loading && !productConfLoaded ){
                    this.loading = true;
                    this.store.dispatch(ProductsConfigListLoadStart(
                        {productConfParam: { category: '' , status: -1 ,
                        filter: '', sortDirection: 'asc',
                        sortField: 'name', pageIndex: 1,
                        pageSize: 10}}
                    ));
                }
            }),
            filter(productConfLoaded => productConfLoaded ),
            first(),
            finalize(() => this.loading = false)
        );
}


}
