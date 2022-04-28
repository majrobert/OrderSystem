import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { PriceType } from '../model/PriceType';
import { Subscription } from 'rxjs';
import { selectAllProductListType } from '../price-list.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { updatePriceListType } from '../price-list.action';

@Component({
  selector: 'price-type',
  templateUrl: './price-type.component.html',
  styleUrls: ['./price-type.component.css']
})
export class PriceTypeComponent implements OnInit, OnDestroy {


  priceListtype: PriceType[];
  suscriber: Subscription[] = [];
  curentEdit: string = '';
  currentPozEdit: PriceType;
  priceTypeform: FormGroup;


  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit() {
   const priceListTypeSub =  this.store.pipe(select(selectAllProductListType)).subscribe(
      data => this.priceListtype = data
    );
    this.suscriber.push(priceListTypeSub);
    this.initializeForm();
  }

  selectToEdit(item: PriceType) {
    this.priceTypeform.patchValue(item);
    this.curentEdit = item.id;
    this.currentPozEdit = item;
  }
  initializeForm () {
    this.priceTypeform = this.fb.group({
      name : ['', Validators.required],
      margin: [ 0, Validators.min(0)],
      sort: [0, Validators.min(0)],
      status: [1, Validators.min(0)]
     });
  }

  ngOnDestroy(): void {
    this.suscriber.forEach(x => x.unsubscribe());
  }

  save() {
    const valueToUpdate: PriceType = {
      ...this.currentPozEdit,
      ...this.priceTypeform.value
    };

    this.store.dispatch(updatePriceListType({price: valueToUpdate}));
  }


}
