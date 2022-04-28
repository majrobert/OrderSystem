import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentOferConfId, areOrerElemConLoad } from '../state/offers.selectors';
import { take, tap, filter, first, finalize } from 'rxjs/operators';
import { OrderElemConfLoadStart } from '../state/offers.action';

@Injectable()
export class OrderElemConfResolver implements Resolve<any> {
    loading = false;
    lastOrderElemConf: string;
    constructor(private store: Store<AppState> ) {}
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
        const offerElemConfId = router.paramMap.get('elemconfId');
       this.store.pipe(select(selectCurrentOferConfId), take(1))
       .subscribe(data => this.lastOrderElemConf = data);

       return this.store.pipe(
           select(areOrerElemConLoad),
           tap(orderElemconfLoad => {
                if (!this.loading && 
                    this.lastOrderElemConf !== offerElemConfId ) {
                    this.loading = true;
                    this.store.dispatch(OrderElemConfLoadStart({orderElemConfId : offerElemConfId}))
                }
           }),
           filter(orderElemconfLoad => orderElemconfLoad),
           first(),
           finalize(() => this.loading = false)
       );

    }

}