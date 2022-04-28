import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import {routerReducer} from '@ngrx/router-store';

import * as fromAuth from '../auth/reducers/index';


export interface AppState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
 auth: fromAuth.authReducer,
};

export const metaReducers: MetaReducer<AppState>[] =
[];
    // !environment.production ? [logger] : [];

