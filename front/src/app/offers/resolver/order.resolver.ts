import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pipe } from 'rxjs';
import { areOrderElemLoad, currentOderId } from '../state/offers.selectors';
import { tap, first, filter, finalize, take } from 'rxjs/operators';
import { OrderloadElemStart } from '../state/offers.action';


@Injectable()
export class OrderResolver implements Resolve<any> {
    loading = false;
    lastorder: string;
    constructor(private store: Store<AppState>) {}
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
       const  offerId = router.paramMap.get('offerid');

       this.store.pipe(select(currentOderId), take(1)).subscribe(
           data => this.lastorder = data
       );
        return this.store.pipe(
            select(areOrderElemLoad),
            tap(orderElemLoad => {
                if (!this.loading && this.lastorder !== offerId) {
                    this.loading = true;
                    this.store.dispatch(OrderloadElemStart({orderId: offerId }));
                }
            }),
            filter(orderElemLoad => orderElemLoad),
            first(),
            finalize(() => this.loading = false)
         );
    }
}
