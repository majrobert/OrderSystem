import { DictionaryComponent } from './dictionary/dictionary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UsersResolver } from './Users.resolver';
import { RolesComponent } from './roles/roles.component';
import { RoleResolver } from './role.resolver';

const routes: Routes = [
  { path: '', component: UserListComponent,
    resolve: {
      users: UsersResolver }
  },
  { path: 'role', component: RolesComponent ,
resolve: {
  roles: RoleResolver
}},
{ path: 'dictionary', component: DictionaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
