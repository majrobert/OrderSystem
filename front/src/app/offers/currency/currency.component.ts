import { Component, OnInit, OnDestroy } from '@angular/core';
import { Currency } from '../model/currency';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getAllCurrency } from '../state/offers.selectors';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { updateCurrencyStart, insertCurrencyStart } from '../state/offers.action';
import { LayoutUtilsService } from 'src/app/shared/modules/partials-module/LayoutUtilsService';

@Component({
  selector: 'currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit, OnDestroy {

  currencyForm: FormGroup;
  curentEdit = '';
  title: string;
  substryptrion: Subscription[] = [];
  currencys: Currency[];
  currencyEdit: Currency;

  constructor(private store: Store<AppState>, private fb: FormBuilder,
    private layoutUtilsService: LayoutUtilsService) { }

  ngOnInit() {
    this.title = 'Dodaj walutę';
   const currencySub = this.store.pipe(select(getAllCurrency)).subscribe(
      data => this.currencys = data
    );
    this.substryptrion.push(currencySub);
    this.initializaForm();
  }

  selectToEdit(currency: Currency) {
    this.title = 'Edycja waluty';
    this.curentEdit = currency.id;
      this.currencyForm.patchValue(currency);
      this.currencyEdit = currency;
  }

  ngOnDestroy()  {
    this.substryptrion.forEach( s => s.unsubscribe);
  }

  initializaForm(){
    this.currencyForm = this.fb.group({
      name: ['', Validators.required],
      exchange: ['', Validators.min(0)]
    });
  }

  save() {
    if (this.curentEdit === '') {
      const valueToInsert: Currency = {
        ...this.currencyForm.value
      };
      console.log(valueToInsert);
      const _title = 'Dodawanie Waluty';
    const _description = 'Czy dodać walutę';
    const _waitDesciption = 'Product is deleting...';


    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.store.dispatch(insertCurrencyStart({currency: valueToInsert}));
    });
    } else {
      const valueToUpdate: Currency = {
        ...this.currencyEdit,
        ...this.currencyForm.value
      };
      this.store.dispatch(updateCurrencyStart({currency: valueToUpdate}));
    }

  }

  resetForm() {
    this.currencyForm.reset();
    this.title = 'Dodaj walutę';
    this.currencyEdit = undefined;
    this.curentEdit = '';
  }

}
