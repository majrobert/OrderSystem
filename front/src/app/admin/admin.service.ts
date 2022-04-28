import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { User } from './model/user.model';
import { UserRole } from './model/userRole.model';
import { Dict } from './model/dict';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.urlService}/admin`);
  }

  getAllRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${environment.urlService}/admin/roles`);
  }

  addUserRole(name: string): Observable<UserRole[]> {
    return this.http.post<UserRole[]>
      (`${environment.urlService}/admin/role`, { Name: name });
  }

  deleteRole(id: string): Observable<UserRole[]> {
    return this.http.delete<UserRole[]>
      (`${environment.urlService}/admin/role/${id}`);
  }
  updateRole(name: string, id: string): Observable<UserRole[]> {
    return this.http.put<UserRole[]>
      (`${environment.urlService}/admin/role/${id}`, { Name: name });
  }

  assignRoleToUser(userId: string, roleId: string): Observable<string[]> {
    return this.http.post<string[]>
      (`${environment.urlService}/admin/userrole/${userId}/${roleId}`, {});
  }

  deleteRoleToUser(userId: string, roleId: string): Observable<string[]> {
    return this.http.post<string[]>
      (`${environment.urlService}/admin/userroledel/${userId}/${roleId}`, {});
  }
  loadUserRole(userId: string): Observable<string[]> {
    return this.http.get<string[]>
      (`${environment.urlService}/admin/userrole/${userId}`);
  }
  resetUserPasword(userId: string, password: string) {
    return this.http.post
      (`${environment.urlService}/admin/password/${userId}`, { Password: password, Username: userId });
  }
  deleteUser(userId: string): Observable<User[]> {
    return this.http.delete<User[]>
      (`${environment.urlService}/admin/${userId}`);
  }
  addUser(user: User): Observable<User[]> {
    return this.http.post<User[]>
      (`${environment.urlService}/admin`,
        {
          DisplayName: user.displayName,
          Email: user.email,
          UserName: user.userName,
          Password: user.password
        });
  }

  updateUser(user: User): Observable<User[]> {
    return this.http.put<User[]>
      (`${environment.urlService}/admin/${user.id}`,
        {
          Id: user.id,
          DisplayName: user.displayName,
          Email: user.email,
          UserName: user.userName
        });
  }
  getAllDictionary(): Observable<Dict[]> {
    return this.http.get<Dict[]>(`${environment.urlService}/dict`);
  }

  deleteSlownik(id: string): Observable<Dict[]> {
    return this.http.delete<Dict[]>(`${environment.urlService}/dict/${id}`);
  }



}
