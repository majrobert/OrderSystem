import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpEvent } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { take, exhaustMap, map, filter, tap } from 'rxjs/operators';
import { AppState } from '../reducers';
import { getUser, isLoggedIn } from './auth.selectors';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './model/user.model';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store<AppState>, private router: Router) { }


      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

        const usertok: User =  JSON.parse(localStorage.getItem('user'));
        if(usertok) {
            request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${usertok.token}`
                }
              });
        }
        return next.handle(request);
      }
}
