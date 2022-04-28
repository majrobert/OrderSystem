import { Component, OnInit, Inject } from '@angular/core';
import { OrderElem } from '../../model/order-elem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'offer-hand-mod-elem-modal',
  templateUrl: './offer-hand-mod-elem-modal.component.html',
  styleUrls: ['./offer-hand-mod-elem-modal.component.css']
})
export class OfferHandModElemModalComponent implements OnInit {

  title = '';
  mode: string;
  offer: OrderElem;
  orderElemForm: FormGroup;
  public editor = ClassicEditor;
  constructor(public dialogRef: MatDialogRef<OfferHandModElemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder) {
    this.title = data.dialogTitle;
    this.mode = data.mode;
    this.offer = data.dane;
  }

  ngOnInit() {
    this.initForm();
    if (this.mode === 'edit') {
      this.initData();
    }

  }
  initForm() {
    this.orderElemForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      jm: ['', Validators.required],
      type: ['', Validators.required],
      vat: ['', Validators.required],
      sort: [],
      lp: [''],
      pricePurchase: ['', [Validators.min(1), Validators.required]],
      priceAfterDiscount: ['', [Validators.min(1), Validators.required]],
      quantity: ['', [Validators.min(1), Validators.required]],
      price: ['', [Validators.min(1), Validators.required]],
      description: ['']
    });
  }
  initData() {
    this.orderElemForm.patchValue(this.offer);
    this.orderElemForm.patchValue
      ({ priceAfterDiscount: this.offer.priceAfterDiscount / this.offer.quantity });
  }
  addPoz() {
if (this.mode === 'edit') {
  const dane = {
    ...this.offer,
    ...this.orderElemForm.value,
    ...{priceAfterDiscount:
      this.orderElemForm.value.priceAfterDiscount
      * this.orderElemForm.value.quantity,
      priceBrutto: (this.orderElemForm.value.priceAfterDiscount
        * this.orderElemForm.value.quantity) *
        ((this.offer.vat / 100) + 1)
    }
  };
  this.dialogRef.close(dane);

} else {
  this.dialogRef.close(this.orderElemForm.value);
}}
}
