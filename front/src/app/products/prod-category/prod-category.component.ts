import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Category } from '../model/category';
import { Subscription } from 'rxjs';
import { selectAllCategory } from '../products-state/products.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { insertCategoryStart, updateCategory, deleteCategory } from '../products-state/products.action';
import { snackbarOpen } from 'src/app/shared/actions/snackbar.action';

@Component({
  selector: 'prod-category',
  templateUrl: './prod-category.component.html',
  styleUrls: ['./prod-category.component.css']
})
export class ProdCategoryComponent implements OnInit, OnDestroy {

  categories: Category[] = []
  private subscribtions: Subscription[] = [];
  constructor(private store: Store<AppState> , private fb: FormBuilder) { }

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
   const userSub = this.store.pipe(select(selectAllCategory)).subscribe(
      data => this.categories = data
    );
    this.subscribtions.push(userSub);
  }
  edytuj(category: Category) {
    this.categoryForm.patchValue({...category});
  }

  skasuj(category: Category) {
    const roleId: string = category.id;
      this.store.dispatch(deleteCategory({ category: roleId}));
  }

 

  save() {
    const name: string = this.categoryForm.value.name;
    const categoryId = this.categoryForm.value.id;
    const details = this.categoryForm.value.details;
    const sort = this.categoryForm.value.sort;

    if (categoryId === null) {
      this.store.dispatch(insertCategoryStart({category: { id: '', name: name, details: details, sort: sort}}));
      this.categoryForm.reset();
    }
    if (categoryId !== null) {
     this.store.dispatch(updateCategory({category: { id: categoryId , name: name, details: details, sort: sort}}));
     this.categoryForm.reset();
    }
  }

  ngOnDestroy() {
    this.subscribtions.forEach(s => s.unsubscribe);
  }


}
