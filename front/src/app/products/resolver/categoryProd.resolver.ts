import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { loadAllCategory } from '../products-state/products.action';
import { areCategoriesLoaded } from '../products-state/products.selectors';

@Injectable()
export class CategoryResolver implements Resolve<any> {

    loading = false;
    constructor(private store: Store<AppState>) {}

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return this.store
                 .pipe(
                     select(areCategoriesLoaded),
                        tap(categoryLoaded => {
                            if (!this.loading && !categoryLoaded) {
                                this.loading = true;
                            this.store.dispatch(loadAllCategory());
                            }
                        }),
                        filter(categoryLoaded => categoryLoaded),
                        first(),
                        finalize(() => this.loading = false)
                        );
}
}
