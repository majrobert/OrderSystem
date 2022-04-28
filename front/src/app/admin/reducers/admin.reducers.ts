import { User } from '../model/user.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { UserActions } from '../action-types';
import { UserRole } from 'src/app/auth/model/userRoles';


export interface AdminState extends EntityState<User> {
    role: UserRole[];
    curentRole: string[];
}

export const adapter = createEntityAdapter<User>();

export const initialAdminState = adapter.getInitialState(
);

const _adminReducer = createReducer(
    initialAdminState,

    on(UserActions.AllUsersLoaded, (state, action) =>
        adapter.addAll(action.users, state)
    ),

    on(UserActions.AllRoleLoaded, (state, action) => (
        {...state, role: action.role}
    )),

    on(UserActions.AddRoleToUser, (state, action) => (
        {...state,  curentRole: action.role}
    )),
);
export function adminReducer ( state, action ){
    return _adminReducer(state, action);
  }


export const { selectAll } = adapter.getSelectors();
