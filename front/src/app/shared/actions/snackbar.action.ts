import { createAction, props } from '@ngrx/store';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const snackbarOpen  = createAction (
    '[SNACKBAR_OPEN]',
    props<{ message: string, action?: string, config?: MatSnackBarConfig}>()
);

export const snackbarClose = createAction (
    '[SNACKBAR_CLOSE]'
);
