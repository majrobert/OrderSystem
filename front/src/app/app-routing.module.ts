import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AccessDeniedComponent } from './layout/access-denied/access-denied.component';

const routes: Routes = [
    { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) , canActivate: [AuthGuard]},
   
    // { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) }, 
    { path: 'access-denied', component: AccessDeniedComponent },
   
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
