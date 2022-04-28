import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { LoginStart } from '../auth.action';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    constructor(
      private router: Router,
      private fb: FormBuilder,
      private authService: AuthService,
      private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }


    onLoggedin() {
       this.store.dispatch(LoginStart({email: this.form.value.email, password: this.form.value.password}));
    }
}
