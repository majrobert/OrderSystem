import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products } from 'src/app/products/model/products';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrls: ['./product-add-modal.component.css']
})
export class ProductAddModalComponent implements OnInit {

  title: string;
  produkt: {name: string, code: string, status: number, quantity: number, sort: number};
  prductForm: FormGroup;
  statusProduct = [{value: '1' , name: 'Aktywny'}, {value: '2', name: 'Nieaktywny'}];
  constructor(  private fb: FormBuilder, public dialogRef: MatDialogRef<ProductAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.produkt = data.product;
      this.title = data.dialogTitle;
     }

     initForm() {
      this.prductForm = this.fb.group({
        quantity: [],
        sort: [],
        status: [],
      });
    }

  ngOnInit() {
    this.initForm();
    this.initData();
  }
  initData() {
    this.prductForm.patchValue({...this.produkt});
    this.prductForm.patchValue({status: this.produkt.status.toString()});
  }

  dodajProdukt() {
// console.log(this.prductForm.value);
    this.dialogRef.close(this.prductForm.value);
  }

}
