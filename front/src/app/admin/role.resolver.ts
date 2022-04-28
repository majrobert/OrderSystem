import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { loadAllRoles } from './admin.actions';


@Injectable()
export class RoleResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return this.store.pipe(
            tap(() => {
                if (!this.loading) {
                    this.loading = true;
                    this.store.dispatch(loadAllRoles());
                }
            }),
            first(),
            finalize(() => this.loading = false)
        );
    }
}
