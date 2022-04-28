import { createSelector, createFeatureSelector, createReducer } from '@ngrx/store';
import { AuthState } from './reducers';

// tslint:disable-next-line:quotemark
export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => auth.loggedIn
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);



export const getUser = createSelector(
    selectAuthState,
    (auth) => auth.user
    );
