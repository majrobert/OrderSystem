import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getOffer, selectAllProductElemConf, selectAllOrderSElem, getSumOfferSElem, selectOrderElement } from '../state/offers.selectors';
import { first } from 'rxjs/operators';
import { Order } from '../model/order';
import { ProductConf } from 'src/app/product-conf/model/productConf';
import { ProductPrice } from 'src/app/price-list/model/productPrice';
import { Products } from 'src/app/products/model/products';
import { getProductForOffer } from 'src/app/price-list/price-list.selectors';
import { OrderElem } from '../model/order-elem';
import { InsertSElemConfStart, DelereOrderSElemStart, UpdateOrderSElemStart, UpdateElementConfStart } from '../state/offers.action';
import { MatDialog } from '@angular/material/dialog';
import { defaultDialogConfig } from 'src/app/shared/pipes/default-dialog-config';
import { OfferModElemModalComponent } from '../partial/offer-mod-elem-modal/offer-mod-elem-modal.component';

@Component({
  selector: 'offer-edit-conf',
  templateUrl: './offer-edit-conf.component.html',
  styleUrls: ['./offer-edit-conf.component.css']
})
export class OfferEditConfComponent implements OnInit {

  private subscription: Subscription[] = [];
  offer: Order;
  offerId: string;
  offerElemConfId: string;
  currentProduct: Products;
  ordertSElem: OrderElem[];
  orderElemConf: OrderElem;
  getSumOfferSElem: { sumWart: number, sumDiscount: number, sumZakup: number, sumBrutto: number, sumUpust: number };
  productPriceConf: ProductPrice[] = [];

  constructor(private route: ActivatedRoute,
    private store: Store<AppState>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.offerId = this.route.snapshot.paramMap.get('offerid');
    this.offerElemConfId = this.route.snapshot.paramMap.get('elemconfId');
    const orderSub = this.store.pipe(select(getOffer(this.offerId)))
      .subscribe(
        data => {
          this.offer = data;
        }
      );
    this.subscription.push(orderSub);
    const productConfigSub = this.store.pipe(select(selectAllProductElemConf))
      .subscribe(data => this.productPriceConf = data);
    this.subscription.push(productConfigSub);
    const orderSElemSub = this.store.pipe(select(selectAllOrderSElem))
      .subscribe(data => this.ordertSElem = data);
    this.subscription.push(orderSElemSub);
    const sumSub = this.store.pipe(select(getSumOfferSElem)).subscribe(
      data => this.getSumOfferSElem = data
    );
    this.subscription.push(sumSub);
    const orderSelemSub = this.store.pipe(select(selectOrderElement(this.offerElemConfId)))
    .subscribe( data => {
      console.log(data);
      this.orderElemConf = data; });
    this.subscription.push(orderSelemSub);
  }
  addToElement(poz: ProductPrice) {
    
    const productSub = this.store.pipe(
      select(getProductForOffer(poz.productId)),
      first()
    ).subscribe(product => this.currentProduct = product);
    let cost = poz.cost;
    if (poz.priceSpec) {
      cost = poz.priceSpec;
    }
    this.subscription.push(productSub);
    const dane: OrderElem = {
      sort: 1, lp: '',
      description: this.currentProduct.description,
      name: poz.productName, code: poz.productCode,
      price: cost, pricePurchase: this.currentProduct.price,
      priceAfterDiscount: cost * poz.quantity,
      priceBrutto: (poz.cost * poz.quantity) * ((this.currentProduct.vat / 100) + 1),
      quantity: poz.quantity, jm: this.currentProduct.jm,
      currency: this.offer.currency.name, vat: this.currentProduct.vat,
      type: this.currentProduct.type, orderId: this.offer.id,
      orderHeaderId: this.offerId, productId: poz.productId,
      status: 1, orderElemConfId: this.offerElemConfId
    };

    console.log(dane);
    this.store.dispatch(InsertSElemConfStart({ orderSElemConf: dane }));
  }

  deleteSElem(poz: OrderElem) {
    this.store.dispatch(DelereOrderSElemStart({ orderSElemConf: poz }));
  }
  editSElem(poz: OrderElem) {
    const dialogConfig = defaultDialogConfig();
      dialogConfig.data = {
        dialogTitle: 'Edycja Elementu',
        dane: poz,
        mode: 'mod'
      };
      const dialogRef = this.dialog.open(OfferModElemModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
         this.store.dispatch(UpdateOrderSElemStart({ orderSElemConf: res }));
      });
  }
  editElemConf(orderElemConf: OrderElem) {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Edycja Elementu',
      dane: orderElemConf,
      mode: 'mod'
    };
    const dialogRef = this.dialog.open(OfferModElemModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res: OrderElem) => {
      if (res) {
        this.store.dispatch(UpdateElementConfStart({orderElemConf: res}));
      }
    });

  }

}
