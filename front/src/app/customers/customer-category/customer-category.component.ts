import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryC } from '../model/categoryC';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectAllCustomersCategory } from '../customers.selectors';
import { deleteCategoryC, insertCategoryCStart, updateCategoryC } from '../customers.action';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'customer-category',
  templateUrl: './customer-category.component.html',
  styleUrls: ['./customer-category.component.css']
})
export class CustomerCategoryComponent implements OnInit, OnDestroy {

  categories: CategoryC[] = []
  private subscribtions: Subscription[] = [];
  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  categoryForm: FormGroup;

  ngOnInit() {
    this.InitCourse();
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      details: [''],
      sort: [1]

    });
  }

  InitCourse() {
    const userSub = this.store.pipe(select(selectAllCustomersCategory)).subscribe(
      data => this.categories = data
    );
    this.subscribtions.push(userSub);
  }
  edytuj(category: CategoryC) {
    this.categoryForm.patchValue({ ...category });
  }

  skasuj(category: CategoryC) {
    const roleId: string = category.id;
    this.store.dispatch(deleteCategoryC({ category: roleId }));
  }

  save() {
    const name: string = this.categoryForm.value.name;
    const categoryId = this.categoryForm.value.id;
    const details = this.categoryForm.value.details;
    const sort = this.categoryForm.value.sort;

    if (categoryId === null) {
      this.store.dispatch(insertCategoryCStart({ category: { id: '', name: name, details: details, sort: sort } }));
      this.categoryForm.reset();
    }
    if (categoryId !== null) {
      this.store.dispatch(updateCategoryC({ category: { id: categoryId, name: name, details: details, sort: sort } }));
      this.categoryForm.reset();
    }
  }

  ngOnDestroy() {
    this.subscribtions.forEach(s => s.unsubscribe);
  }
}
