import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../model/order';
import { Customers } from 'src/app/customers/model/customers';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { GetCustomerStart } from 'src/app/customers/customers.action';
import { getOneCustomer } from 'src/app/customers/customers.selectors';
import { first } from 'rxjs/operators';
import { getOffer } from '../../state/offers.selectors';

@Component({
  selector: 'offer-header',
  templateUrl: './offer-header.component.html',
  styleUrls: ['./offer-header.component.css']
})
export class OfferHeaderComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  customerD: Customers;
  @Input() offerId: string;
  offer: Order;

  ngOnInit() {
    this.store.pipe(select(getOffer(this.offerId))).subscribe( data =>
      this.offer = data
    );
    if (this.offer.customerId === this.offer.customerDId) {
      this.customerD = this.offer.customer;
    } else {
      this.store.dispatch(GetCustomerStart({ customerId: this.offer.customerDId}));
      this.store.pipe(select(getOneCustomer(this.offer.customerDId)))
      .subscribe( customer => this.customerD = customer);
    }
  }

}
