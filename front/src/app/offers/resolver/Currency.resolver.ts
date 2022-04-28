import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { areCurrencyLoaded } from '../state/offers.selectors';
import { tap, first, filter, finalize } from 'rxjs/operators';
import { loadAllCurrencyStart } from '../state/offers.action';

@Injectable()
export class CurrencyResolver implements Resolve<any> {
  
    loading = false;
    constructor(private store: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
     return   this.store
        .pipe(
            select(areCurrencyLoaded),
            tap(currencyLoaded => {
              if (!this.loading && !currencyLoaded)  {
                this.loading = true;
                this.store.dispatch(loadAllCurrencyStart());
              }
            }),
            filter(currencyLoaded => currencyLoaded),
            first(),
            finalize(() => this.loading = false)
        );
    }
}
