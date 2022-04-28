import { createAction, props } from '@ngrx/store';
import { User } from './model/user.model';
import { UserRole } from './model/userRole.model';


export const loadAllUsers = createAction(
'[User Resolver] Load all users'
);

export const AllUsersLoaded = createAction(
    '[Load User Effect] All Users Loaded',
    props<{users: User[]}>()
);

export const loadAllRoles = createAction (
 '[Role Resolver] load all roles'
);

export const AllRoleLoaded = createAction(
 '[Role Resolver] load all loaded',
  props<{role: UserRole[]}>()
);

export const AddRoleStart = createAction (
  '[Role admin] add role user',
  props<{role: string}>()
);

export const DeleteUserRole = createAction(
  '[Delete role] delete user roles',
  props<{role: string}>()
);

export const UpdateUserRole = createAction(
  '[Update user Role]',
  props<{role: UserRole}>()
);
// ----- roles and users
// allUserRoles
export const loadAllUserRoles = createAction (
  '[admin panel user] load user role',
  props<{userId: string}>()
);

export const assignRoleToUser = createAction (
  '[admin panel] assignRoleToUser',
  props<{roleId: string, userId: string}>()
);

export const deleteRoleToUser = createAction (
  '[admin panel] deleteRoleToUser',
  props<{roleId: string, userId: string}>()
);

export const AddRoleToUser = createAction (
  '[admin panel] dadanie praw user',
  props<{role: string[]}>()
);

export const reserPaswordUser = createAction (
  '[admin panel] reset user password',
  props<{userId: string , password: string}>()
);

export const sendMessage = createAction (
  '[admin panel] send mesage ',
    props<{message: string}>()
);

export const deleteUser = createAction (
  '[admin panel] delete user ',
  props<{userId: string}>()
);

export const addUser = createAction (
  '[admin panel] create user',
  props<{user: User}>()
);

export const updateUser = createAction (
  '[admin panel] update user',
  props<{user: User}>()
);



