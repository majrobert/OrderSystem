import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthAction } from '../action-types';




export interface AuthState {
  user: User;
  loggedIn: boolean;
}

export const initialAuthState = {
  user: undefined,
  loggedIn: false
};

 const _authReducer = createReducer(
  initialAuthState,
  on(AuthAction.login, (state, action) => {
    return {
      user: action.user,
      loggedIn: true
    };
  }),
  on(AuthAction.logout, (state, action) => {
    return {
      user: undefined,
      loggedIn: false
    };
  })
);
export function authReducer ( state, action ){
  return _authReducer(state, action);
}

