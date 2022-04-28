import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UsersResolver } from './Users.resolver';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './admin.effects';
import { StoreModule } from '@ngrx/store';
import { adminReducer } from './reducers/admin.reducers';
import { AdminService } from './admin.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { MaterialModule } from '../shared/modules/material.module';
import { RolesComponent } from './roles/roles.component';
import { RoleResolver } from './role.resolver';
import { DictionaryComponent } from './dictionary/dictionary.component';

@NgModule({
  declarations: [UserListComponent, RolesComponent, DictionaryComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forFeature([AdminEffects]),
    StoreModule.forFeature('users', adminReducer),
    MaterialModule
  ], providers: [
    AdminService,
    UsersResolver,
    RoleResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ]
})
export class AdminModule { }
