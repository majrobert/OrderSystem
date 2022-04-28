import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';
import { User } from './model/user.model';
import { login } from '../auth/auth.action';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor( private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

           return  this.store.pipe(
               select(isLoggedIn)
               , tap(loggedIn => {
                   if (!loggedIn) {
                    
                    const usertok: User =  JSON.parse(localStorage.getItem('user'));
                    if (usertok) {
                       this.store.dispatch(login({user: usertok})) ;
                        } else {
                            this.router.navigateByUrl('/login');
                        }
                    
                   }
               }));
        }
}
