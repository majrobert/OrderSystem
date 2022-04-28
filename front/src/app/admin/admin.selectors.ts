import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './reducers/admin.reducers';

import * as fromAdmin from './reducers/admin.reducers';
import { UserRole } from './model/userRole.model';



export const selectAdminState = createFeatureSelector<AdminState>('users');

export const selectAllUsers = createSelector(
    selectAdminState,
    fromAdmin.selectAll
);
export const selectAllRole = createSelector(
    selectAdminState,
    auth => auth.role
);

export const selectUserRole = (id: string) => createSelector(
    selectAdminState,
    selectAllRole,
    (users, roles: UserRole[]) => {
        const rolesUser = users.curentRole;
        if (rolesUser) {
        return roles.map( role => ({
            id: role.id,
            name: role.name,
            userId: rolesUser.find(u => u === role.name) ? role.id : null
        }));
    } else {
        return roles;
    }
    }
);
