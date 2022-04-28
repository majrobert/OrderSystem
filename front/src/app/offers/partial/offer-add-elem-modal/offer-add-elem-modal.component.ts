import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { OrderElem } from '../../model/order-elem';
import { ProductPrice } from 'src/app/price-list/model/productPrice';


@Component({
  selector: 'offer-add-elem-modal',
  templateUrl: './offer-add-elem-modal.component.html',
  styleUrls: ['./offer-add-elem-modal.component.css']
})
export class OfferAddElemModalComponent implements OnInit {
  title = '';
  mode: string;
  offer: ProductPrice;
  orderElemForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<OfferAddElemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,) {
    this.title = data.dialogTitle;
    this.mode = data.mode;
    this.offer = data.dane;
  }

  ngOnInit() {
    this.initForm();
    this.initData();
  }

  addPoz() {
     this.dialogRef.close(this.orderElemForm.value);
  }

  initForm() {
    this.orderElemForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
      cost: ['']
    });
  }
  initData() {
    this.orderElemForm.patchValue({ quantity: 1 });
    if (this.offer.priceSpec) {
      this.orderElemForm.patchValue({ cost: this.offer.priceSpec });
    } else {
      this.orderElemForm.patchValue({ cost: this.offer.cost });
    }
  }

}
