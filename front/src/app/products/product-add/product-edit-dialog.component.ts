import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Category } from '../model/category';
import { Subscription } from 'rxjs';
import { selectAllCategory } from '../products-state/products.selectors';
import { Products } from '../model/products';
import { insertProductStart } from '../products-state/products.action';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})
export class ProductEditDialogComponent implements OnInit, OnDestroy {

  title = '';
  subscription: Subscription;
  kategorie: Category[];
  prductForm: FormGroup;
  mode: string;
  produkt: Products;
  public editor = ClassicEditor;

  selected = '1';

  constructor(public dialogRef: MatDialogRef<ProductEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private store: Store<AppState>) {
    this.title = data.dialogTitle;
    this.mode = data.mode;
    this.produkt = data.dane;

  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(selectAllCategory)).subscribe((data: Category[]) =>
      this.kategorie = data);
    this.initForm();
  }
  initForm() {
    this.prductForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      code: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      vat: [23, [Validators.required]],
      jm: ['', Validators.required],
      type: ['1'],
      status: ['1'],
      categoryProdId: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clouse() {
    this.dialogRef.close('kkkk');
  }

  dodajProdukt() {
    if (this.mode === 'add') {
      const dane = this.prductForm.value;
      console.log(this.prductForm.value);
      this.store.dispatch(insertProductStart({ product: dane }));
      this.dialogRef.close('kkkk');
    }

  }

}
