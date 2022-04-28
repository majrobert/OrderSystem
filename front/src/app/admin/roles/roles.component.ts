import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Subscriber, Subscription } from 'rxjs';
import { UserRole } from '../model/userRole.model';
import { selectAllRole } from '../admin.selectors';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddRoleStart, DeleteUserRole, UpdateUserRole } from '../admin.actions';


@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {
  

  private subscribe: Subscription[] = [];
  roles: UserRole[];
  roleForm: FormGroup;
  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit() {
    this.InitRole();
    this.initForm();
  }

  InitRole() {
    const roleSub = this.store.pipe(select(selectAllRole)).subscribe(
      (data: UserRole[]) => this.roles = data
    );
    this.subscribe.push(roleSub);
  }

  edytuj(role: UserRole) {
    this.roleForm.patchValue({...role});
  }

  initForm() {
    this.roleForm = this.fb.group({
      id: [null],
      name: ['', Validators.required]
    });
  }


  ngOnDestroy(){
    this.subscribe.forEach(s => s.unsubscribe());
  }

  skasuj(role: UserRole) {
    const roleId: string = role.id;
     this.store.dispatch( DeleteUserRole({role: roleId}));
  }

  save() {
    const role: string = this.roleForm.value.name;
    const roleId = this.roleForm.value.id;

    if (roleId === null) {
      this.store.dispatch(AddRoleStart({role}));
      this.roleForm.reset();
    }
    if (roleId !== null || roleId === '') {
     this.store.dispatch(UpdateUserRole({role: {name: role, id: roleId}}));
      this.roleForm.reset();
    }
  }
}
