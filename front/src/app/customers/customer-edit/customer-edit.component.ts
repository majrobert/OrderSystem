import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Customers } from '../model/customers';
import { insertCustomerStart, UpdateCustomerStart } from '../customers.action';
import { CategoryC } from '../model/categoryC';
import { Subscription } from 'rxjs';
import { selectAllCustomersCategory, getOneCustomer } from '../customers.selectors';
import { selectAllProductListType } from 'src/app/price-list/price-list.selectors';
import { PriceType } from 'src/app/price-list/model/PriceType';

@Component({
  selector: 'customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit, OnDestroy {


  customerId: string;
  customer: Customers;
  title: string;
  customerForm: FormGroup;
  kategorie: CategoryC[] = [];
  priceType: PriceType[] = [];
  statusCustomer: [{value: 1 , name: 'Aktywny'}, {value: 2, name: 'Nieaktywny'}];

  private subsci: Subscription[] = [];

  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private store: Store<AppState> , private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.customerId = this.route.snapshot.paramMap.get('customerid');
    if (this.customerId === '0' ) {
      this.title = 'Dodawanie klienta';
    } else {
      this.title = 'Edycja klienta';
      const customerSub = this.store.pipe(select(getOneCustomer(this.customerId))).subscribe(
        customer => this.customer =  customer
      );
      this.subsci.push(customerSub);
      this.initData();
    }
    const kategSub = this.store.pipe(select(selectAllCustomersCategory)).subscribe(
      data => this.kategorie = data
    );
    this.subsci.push(kategSub);

    const priceSub = this.store.pipe(select(selectAllProductListType)).subscribe(
      data => this.priceType = data
    );
    this.subsci.push(priceSub);

  }
  initForm() {
    this.customerForm = this.fb.group({
      akronim: ['', Validators.required],
      name: ['', Validators.required],
      phone: [],
      contact: [],
      streed: [],
      city: [],
      nip: [],
      zipCode: [],
      status: [],
      categoryCustomerId: [],
      priceId: []
    });
  }
  initData(){
    this.customerForm.patchValue({...this.customer});
     this.customerForm.patchValue({status: this.customer.status.toString()});
  }
  ngOnDestroy() {
    this.subsci.forEach(x => x.unsubscribe());
  }

  updateCustomer() {
    const dane: Customers = {
      ...this.customerForm.value,
      ...{gidCdn: 0}
    };
    if (this.customerId !== '0') {
      const daneToUpdate: Customers = {
        ...this.customer,
        ...this.customerForm.value,
      };
      console.log(daneToUpdate);
      this.store.dispatch(UpdateCustomerStart({customer: daneToUpdate}));
      this.router.navigate(['customers']);
    } else {
      this.store.dispatch(insertCustomerStart({ customer: dane}));
      this.router.navigate(['customers']);
    }

  }

}
