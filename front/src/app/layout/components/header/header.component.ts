import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { getUser } from 'src/app/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/model/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
   
    public pushRightClass: string;
    public user: User;
    private suscriber: Subscription[] = [];

    constructor(private translate: TranslateService, public router: Router, private store: Store<AppState> ) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
     const userSub =   this.store.pipe(select(getUser)).subscribe(
(user: User) => this.user = user
     );
     this.suscriber.push(userSub);
    }

    ngOnDestroy() {
        this.suscriber.forEach( x => x.unsubscribe());
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
