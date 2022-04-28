import { UserRole } from './userRole.model';


export interface User {
    id: string;
    displayName: string;
    email: string;
    userName: string;
    password?: string;
    userRole?: UserRole[];
}
