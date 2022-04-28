import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { isLoggedOut, selectAuthState } from './auth/auth.selectors';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private store: Store<AppState>, private router: Router) {
    }

    ngOnInit() {
      // this.store.select(selectAuthState).subscribe(
      //     data => {
      //         if (!data) {
      //           this.router.navigate(['/login']);
      //         }
      //     }
      // );
    }
}
