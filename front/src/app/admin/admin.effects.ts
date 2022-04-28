import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { UserActions } from './action-types';
import { concatMap, map, tap } from 'rxjs/operators';
import { AdminService } from './admin.service';
import { AllUsersLoaded, AllRoleLoaded, AddRoleToUser, sendMessage } from './admin.actions';
import { User } from './model/user.model';
import { UserRole } from './model/userRole.model';


@Injectable()
export class AdminEffects {

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(UserActions.loadAllUsers),
            concatMap(action =>
                this.adminService.getAllUsers()),
            map((users: User[]) => AllUsersLoaded({ users }))
        )
    );

    loadRoles$ = createEffect(
        () => this.actions$.pipe(
            ofType(UserActions.loadAllRoles),
            concatMap(action =>
                this.adminService.getAllRoles()),
            map((role: UserRole[]) => AllRoleLoaded({ role }))
        )
    );

    addRole$ = createEffect(
        (): any => this.actions$.pipe(
            ofType(UserActions.AddRoleStart),
            concatMap(action => this.adminService.addUserRole(action.role)),
            map((role: UserRole[]) => AllRoleLoaded({ role }))
        )
    );

    deleteRole$ = createEffect(
        (): any => this.actions$.pipe(
            ofType(UserActions.DeleteUserRole),
            concatMap(action => this.adminService.deleteRole(action.role)),
            map((role: UserRole[]) => AllRoleLoaded({ role }))
        )
    );

    updateRole$ = createEffect(
        (): any => this.actions$.pipe(
            ofType(UserActions.UpdateUserRole),
            concatMap(action => this.adminService.updateRole(action.role.name,
                action.role.id)),
            map((role: UserRole[]) => AllRoleLoaded({ role }))
        )
    );
    assignRoleToUser$ = createEffect(
        (): any => this.actions$.pipe(
            ofType(UserActions.assignRoleToUser),
            concatMap(action => this.adminService.assignRoleToUser(action.userId,
                action.roleId)),
            map((role: string[]) => AddRoleToUser({ role }))
        )
    );

    deleteRoleToUser$ = createEffect(
        (): any => this.actions$.pipe(
            ofType(UserActions.deleteRoleToUser),
            concatMap(action => this.adminService.deleteRoleToUser(action.userId,
                action.roleId)),
            map((role: string[]) => AddRoleToUser({ role }))
        )
    );

    allUserRole$ = createEffect(
        () => this.actions$.pipe(
            ofType(UserActions.loadAllUserRoles),
            concatMap((action) => this.adminService.loadUserRole(action.userId)),
            map((role: string[]) => AddRoleToUser({ role }))
        )
    );
    resetPassword$ = createEffect(
        (): any => this.actions$.pipe(
            ofType(UserActions.reserPaswordUser),
            concatMap(action => this.adminService.resetUserPasword(action.userId, action.password)),
            map(data => sendMessage({ message: 'resetowano hasło' }))
        )
    );
    deletUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(UserActions.deleteUser),
            concatMap(action =>
                this.adminService.deleteUser(action.userId)),
            map((users: User[]) => AllUsersLoaded({ users }))
        )
    );

    addUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(UserActions.addUser),
            concatMap(action =>
                this.adminService.addUser(action.user)),
            map((users: User[]) => AllUsersLoaded({ users }))
        )
    );

    updateUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(UserActions.updateUser),
            concatMap(action =>
                this.adminService.updateUser(action.user)),
            map((users: User[]) => AllUsersLoaded({ users }))
        )
    );

    constructor(private actions$: Actions, private adminService: AdminService) { }
}
