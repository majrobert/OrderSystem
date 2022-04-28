import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AuthAction } from './action-types';
import { tap, concatMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { login } from './auth.action';
import { Observable, of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { User } from './model/user.model';
import { INIT } from '@ngrx/store';

@Injectable()
export class AuthEffects {

    loginStart$ = createEffect(
        (): any => this.actions$.pipe(
            ofType(AuthAction.LoginStart),
            concatMap((action) => this.authService.login(action.email, action.password)),
            map((user: User) => login({ user }))
            )
    );

    login$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthAction.login),
                tap(action => {localStorage.setItem('user',
                    JSON.stringify(action.user));
                    this.router.navigateByUrl('/');
                }
                )
            )
        , { dispatch: false });

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthAction.logout),
            tap(action => {
                localStorage.removeItem('user'),
                    this.router.navigateByUrl('/login');
            })
        ), { dispatch: false });
    
        init$ = createEffect((): any =>
        this.actions$.pipe(
          ofType(INIT),
          map(action => {
              const usertok: User =  JSON.parse(localStorage.getItem('user'));
              let observableResult = of({type: 'NO_ACTION'});
              if (usertok) {
                observableResult = of(login({user: usertok}));
                }
                return observableResult;
          })
        )
      );

    constructor(private actions$: Actions,
        private router: Router, private authService: AuthService) {

    }

}
