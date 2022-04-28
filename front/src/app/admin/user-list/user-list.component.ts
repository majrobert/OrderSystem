import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, BehaviorSubject, noop } from 'rxjs';
import { User } from '../model/user.model';
import { selectAllUsers, selectUserRole, selectAllRole } from '../admin.selectors';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { UserRole } from '../model/userRole.model';
import { assignRoleToUser, deleteRoleToUser, loadAllUserRoles, reserPaswordUser, deleteUser, addUser, updateUser } from '../admin.actions';


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {


  ListUsers: User[];
  userForm: FormGroup;
  UserIdEdit = '';
  userRoles: UserRole[] = [];
  password = '';
  private editUser = new BehaviorSubject<string>('');
  private subscribtions: Subscription[] = [];

  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit() {
    this.readUsers();
    this.initForm();
    this.readRolesInit();
  }

  readUsers() {
    const listUserSub = this.store.pipe(select(selectAllUsers))
      .subscribe(users => this.ListUsers = users);
    this.subscribtions.push(listUserSub);
  }

  readRolesInit() {
    const roleSub = this.store.pipe(select(selectAllRole)).subscribe(
      (data: UserRole[]) => this.userRoles = data
    );
    this.subscribtions.push(roleSub);
  }

  readRoles(id: string) {
    console.log(id);
    const userRoleSub = this.store.pipe(select(selectUserRole(id)))
      .subscribe(data => this.userRoles = data);
    this.subscribtions.push(userRoleSub);
  }

  setUserId(id: string) {
    this.editUser.pipe(
      take(1),
      tap(data => this.UserIdEdit = data)
    ).subscribe(
      noop);
  }
  resetpasword() {

    if (this.UserIdEdit !== '' && this.password !== '') {
      this.store.dispatch(reserPaswordUser
        ({ userId: this.UserIdEdit, password: this.password }));
    }
  }
  saveUser() {
    const user: User = this.userForm.value;
    console.log(user);
    user.password = this.password;
    if (user.id === '' || user.id === null) {
      if ( this.password === '' || this.password === null){
        window.confirm('proszę podać hasło');
      } else {
        this.store.dispatch(addUser({user}));
      }
    } else {
      this.store.dispatch(updateUser({user}));
    }
  }

  uncheck(role) {
    this.store.dispatch(deleteRoleToUser({ roleId: role.id, userId: this.UserIdEdit }));
    this.setUserId(this.UserIdEdit);
  }

  check(role) {
    this.store.dispatch(assignRoleToUser({ roleId: role.id, userId: this.UserIdEdit }));
    this.setUserId(this.UserIdEdit);
  }

  initForm() {
    this.userForm = this.fb.group({
      id: [null],
      userName: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  deleteUser(userId: string) {
    const conf = window.confirm('czy skasować Użytkownika');
    if (conf === true) {
      this.store.dispatch(deleteUser({ userId: userId }));
    }
  }

  edycjaUzytkownika(user: User) {
    this.editUser.next(user.id);
    this.store.dispatch(loadAllUserRoles({ userId: user.id }));
    this.setUserId(user.id);
    this.userForm.patchValue({ ...user });
    this.readRoles(user.id);
  }
  ResetForm() {
    this.editUser.next('');
    console.log('reset form');
    this.setUserId('');
    this.userForm.reset();
  }

  ngOnDestroy() {
    this.subscribtions.forEach(s => s.unsubscribe());
  }


}
