import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customers } from 'src/app/customers/model/customers';
import { Currency } from '../model/currency';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getAllCurrency } from '../state/offers.selectors';
import { Order } from '../model/order';
import { insertOrderStart } from '../state/offers.action';
import { User } from 'src/app/auth/model/user.model';
import { getUser } from 'src/app/auth/auth.selectors';

@Component({
  selector: 'offer-edit-header',
  templateUrl: './offer-edit-header.component.html',
  styleUrls: ['./offer-edit-header.component.css']
})
export class OfferEditHeaderComponent implements OnInit, OnDestroy {

  productId: string;
  title: string;
  buttonTitle: string;
  addCustomerMode: boolean;
  addCustomerDMode: boolean;
  currencyList: string;
  seriaList: string;
  opis: string;
  customerD: Customers;
  customerG: Customers;
  dataObowiazywania: Date;
  dataRealizacji: Date;
  currency: Currency[];
  user: User;
  subsciption: Subscription[] = [];

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {

    this.productId = this.route.snapshot.paramMap.get('offerid');
    this.dataObowiazywania = new Date();
    this.dataRealizacji = new Date();
    const currencySub = this.store.pipe(select(getAllCurrency)).subscribe(
      (data: Currency[]) => this.currency = data
    );
    this.subsciption.push(currencySub);
    const userSub =   this.store.pipe(select(getUser)).subscribe(
      (user: User) => this.user = user
           );
           this. subsciption.push(userSub);

    this.currencyList = this.currency[0].id;
    this.seriaList = 'FS1';
    this.addCustomerMode = false;
    this.addCustomerDMode = false;
    this.initParams();
  }

  initParams() {
    if (this.productId === '0') {
      this.title = 'Dodaj ofertę';
      this.buttonTitle = 'Dodaj klienta';
    } else {
      this.title = 'Edytuj ofertę';
      this.buttonTitle = 'Aktualizuj klienta';
    }
  }
  changeCustomer() {
    this.addCustomerMode = !this.addCustomerMode;
  }

  setCustomer(customer: Customers) {
    this.addCustomerMode = false;
    if (this.addCustomerDMode) {
      this.customerD = { ...customer };
    } else {
      this.customerD = { ...customer };
      this.customerG = { ...customer };
    }
    this.addCustomerDMode = false;
  }
  changeCustomerG() {
    this.addCustomerMode = !this.addCustomerMode;
    this.addCustomerDMode = true;
  }

  ngOnDestroy() {
    this.subsciption.forEach(s => s.unsubscribe);
  }
  addHeader(){
    const dateNow = new Date().toISOString().substring(0, 10);
    const order: Order = {description: this.opis, dateCreation: new Date(),
    dateLimit: this.dataObowiazywania, dateReali: this.dataRealizacji ,
  status: 1, customerId: this.customerG.id, customerDId: this.customerD.id,
currencyId: this.currencyList, exchange: this.currency.filter( x => x.id === this.currencyList)[0].exchange,
series: this.seriaList, userId: this.user.id, value: 0, valueBrutto: 0, discount: 0 };
this.store.dispatch(insertOrderStart({order: order}));
}


}
