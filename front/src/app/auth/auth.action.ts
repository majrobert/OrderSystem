import { createAction, props } from '@ngrx/store';
import { User } from './model/user.model';


export const LoginStart = createAction(
    '[Login Page] User start login',
    props<{ email: string, password: string }>()
);

export const login = createAction(
    '[Login Page] User Login',
    props<{ user: User }>()
);

export const logout = createAction (
    '[Top Menu] Logout'
);
