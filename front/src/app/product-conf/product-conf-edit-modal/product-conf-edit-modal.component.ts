import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Category } from 'src/app/products/model/category';
import { Subscription } from 'rxjs';
import { selectAllCategory } from 'src/app/price-list/price-list.selectors';
import { insertProductConfStart, productConfUpdateStart } from '../state/procuctConf-action';
import { ProductConf } from '../model/productConf';

@Component({
  selector: 'product-conf-edit-modal',
  templateUrl: './product-conf-edit-modal.component.html',
  styleUrls: ['./product-conf-edit-modal.component.css']
})
export class ProductConfEditModalComponent implements OnInit {
  title = '';
  kategorie: Category[];
  prductForm: FormGroup;
  mode: string;
  produktConf: ProductConf;
  subscription: Subscription;
  constructor(public dialogRef: MatDialogRef<ProductConfEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private store: Store<AppState>) {
    this.title = data.dialogTitle;
    this.mode = data.mode;
    this.produktConf = data.dane;
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(selectAllCategory)).subscribe((data: Category[]) =>
      this.kategorie = data);
    this.initForm();
    if (this.mode === 'update') {
      this.initData();
    }
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
  initData() {
    this.prductForm.patchValue({ ...this.produktConf });
    this.prductForm.patchValue({ status: this.produktConf.status.toString() });
    this.prductForm.patchValue({ type: this.produktConf.type.toString() });
  }
  dodajProdukt() {
    const dane = {
      ...this.produktConf,
      ...this.prductForm.value
    };
    if (this.mode === 'update') {
      this.store.dispatch(productConfUpdateStart({productConf: dane}));
    } else {
      this.store.dispatch(insertProductConfStart({ productConf: dane }));
    }

    this.dialogRef.close();
  }

}
