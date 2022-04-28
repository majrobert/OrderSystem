import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './model/user.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string ): Observable<User> {
    return this.http.post<User>(`${environment.urlService}/auth/login`, {email, password}).pipe(
      map((data: any ) => { const user: User = data['user'];
      user.token = data['token'];
     return user; })
    );
  }

}
