import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { shareActions } from '../actions/action-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, tap, map } from 'rxjs/operators';
import { snackbarClose } from '../actions/snackbar.action';


@Injectable()
export class SnackbarEffects {

    closeSnackbar$ = createEffect(
        (): any => this.actions$
            .pipe(
                ofType(shareActions.snackbarClose),
                tap(() => this.matSnackBar.dismiss())
            ), { dispatch: false }
    );

    showSnackbar$ = createEffect(
        (): any => this.actions$
            .pipe(
                ofType(shareActions.snackbarOpen),
                tap((action => {
                        this.matSnackBar.open(action.message, action.action, { duration: 2000 });
                    }))
            ), { dispatch: false }
    );

    constructor(private actions$: Actions, private matSnackBar: MatSnackBar) { }
}
