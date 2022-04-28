import { UserRole } from './userRoles';

export interface User {
    id: string;
    email: string;
    displayName: string;
    userName: string;
    userRoles?: UserRole[];
    token: string;
 }
