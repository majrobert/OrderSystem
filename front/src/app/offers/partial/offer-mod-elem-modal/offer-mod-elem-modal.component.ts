import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderElem } from '../../model/order-elem';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'offer-mod-elem-modal',
  templateUrl: './offer-mod-elem-modal.component.html',
  styleUrls: ['./offer-mod-elem-modal.component.css']
})
export class OfferModElemModalComponent implements OnInit {

  title = '';
  mode: string;
  offer: OrderElem;
  orderElemForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<OfferModElemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder) {
    this.title = data.dialogTitle;
    this.mode = data.mode;
    this.offer = data.dane;
  }

  ngOnInit() {
    this.initForm();
    this.initData();
  }

  addPoz() {

    const dane = {
      ...this.offer,
      ...this.orderElemForm.value,
      ...{
        priceAfterDiscount:
          this.orderElemForm.value.priceAfterDiscount
          * this.orderElemForm.value.quantity,
        priceBrutto: (this.orderElemForm.value.priceAfterDiscount
          * this.orderElemForm.value.quantity) *
          ((this.offer.vat / 100) + 1)
      }
    };
    this.dialogRef.close(dane);
  }

  initForm() {
    this.orderElemForm = this.fb.group({
      sort: [],
      lp: [''],
      priceAfterDiscount: ['', Validators.min(1)],
      quantity: ['', Validators.min(1)],
      description: []
    });
  }
  initData() {
    this.orderElemForm.patchValue(this.offer);
    this.orderElemForm.patchValue
      ({ priceAfterDiscount: this.offer.priceAfterDiscount / this.offer.quantity });
  }

}
