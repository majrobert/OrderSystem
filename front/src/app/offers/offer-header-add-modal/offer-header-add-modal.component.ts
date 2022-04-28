import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { OrderHeader } from '../model/order-header';
import { insertOrderHeaderStart, UpdateOrderHeaderStart } from '../state/offers.action';

@Component({
  selector: 'offer-header-add-modal',
  templateUrl: './offer-header-add-modal.component.html',
  styleUrls: ['./offer-header-add-modal.component.css']
})
export class OfferHeaderAddModalComponent implements OnInit {
  title = '';
  mode: string;
  offerId: string;
  orderHeader: OrderHeader;
  headerForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<OfferHeaderAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private store: Store<AppState>) {
    this.title = data.dialogTitle;
    this.mode = data.mode;
    this.offerId = data.dane;
    this.orderHeader = data.order;
  }

  ngOnInit() {
    
    this.initForm();
    if (this.mode === 'mod') {
      this.initData();
      console.log(this.orderHeader);
    }
  }

  addHeader() {
    const header: OrderHeader = {
      sort: this.headerForm.value.sort,
      name: this.headerForm.value.name,
      orderId: this.offerId
    };
    if (this.mode === 'mod') {
      const dane = {
        ...{id: this.orderHeader.id, orderId: this.orderHeader.orderId},
        ...this.headerForm.value
      };
      this.store.dispatch(UpdateOrderHeaderStart({orderHeader: dane}));
    } else {
      this.store.dispatch(insertOrderHeaderStart({ orderHeader: header }));
    }
    this.dialogRef.close();
  }

  initForm() {
    this.headerForm = this.fb.group({
      name: ['', Validators.required],
      sort: ['1']
    });
  }
  initData() {
    this.headerForm.patchValue(this.orderHeader);
  }

}
