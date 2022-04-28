import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../model/order';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getOffer, getAllHeaderOrderWitchElem, getSumOffert } from '../state/offers.selectors';
import { MatDialog } from '@angular/material/dialog';
import { defaultDialogConfig } from 'src/app/shared/pipes/default-dialog-config';
import { OfferHeaderAddModalComponent } from '../offer-header-add-modal/offer-header-add-modal.component';
import { OrderHeader } from '../model/order-header';
import { OrderElem } from '../model/order-elem';
import { first, finalize } from 'rxjs/operators';
import { LayoutUtilsService } from 'src/app/shared/modules/partials-module/LayoutUtilsService';
import { DeleteCustomerStart } from 'src/app/customers/customers.action';
import { DeleteHeaderFoOrderStart, UpdateDiscountOrder, deleteOrderElemStart, updateOrderElemStart, deleteOrderConfStart, InsertOrderElemHandStart, DeleteOrderElemHanStart, UpdateOderElemHandStart } from '../state/offers.action';
import { ProductPriceOrderCustomerLoad } from 'src/app/price-list/price-list.action';
import { OfferModElemModalComponent } from '../partial/offer-mod-elem-modal/offer-mod-elem-modal.component';
import { OfferHandModElemModalComponent } from '../partial/offer-hand-mod-elem-modal/offer-hand-mod-elem-modal.component';

@Component({
  selector: 'offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit, OnDestroy {


  private subscription: Subscription[] = [];
  orderId: string;
  // data of order
  offer: Order;
  discount = 0;
  // view of partial view
  listOrderView: boolean;
  listOrderElemView: boolean;
  listOrderElemConfView: boolean;
  currentHeaderEdit: string;
  currentOfferElemEdit: OrderElem;
  sums: { sumWart: number, sumDiscount: number, sumZakup: number, sumBrutto: number, sumUpust: number };
  orderHeader: OrderHeader[] = [];
  // list of special price is load
  loadList = false;

  constructor(private route: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    // partial
    this.listOrderView = true;
    this.listOrderElemView = false;
    this.listOrderElemConfView = false;
    this.currentHeaderEdit = '';
    this.orderId = this.route.snapshot.paramMap.get('offerid');
    const orderSub = this.store.pipe(select(getOffer(this.orderId)),
     first(),
      finalize(() => this.dispathElement()))
      .subscribe(
        data => {
          this.offer = data;
        console.log(data);
        }
      );
    this.subscription.push(orderSub);

    const orderHeaderSub = this.store.pipe(
      select(getAllHeaderOrderWitchElem(this.orderId)))
      .subscribe(data => this.orderHeader = data
      );
    this.subscription.push(orderHeaderSub);
    const sumSunSub = this.store.pipe(
      select(getSumOffert(this.orderId))
    ).subscribe(
      data => {
        this.sums = data;
        this.discount = data.sumUpust;
      }
    );
    this.subscription.push(sumSunSub);
  }

  ngOnDestroy() {
    this.subscription.forEach(x => x.unsubscribe);
  }
  addHeader() {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Dodaj Nagłówek',
      dane: this.orderId,
      order: undefined,
      mode: 'add'
    };
    const dialogRef = this.dialog
      .open(OfferHeaderAddModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>
      console.log(res));
  }

  editheader(element: OrderHeader) {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Edycja nagłówka',
      dane: this.orderId,
      order: element,
      mode: 'mod'
    };
    const dialogRef = this.dialog
      .open(OfferHeaderAddModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>
      console.log(res));
  }
  addOrderElemHand(element: OrderHeader) {
    this.currentHeaderEdit = element.id;
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Dodanie elementu dopisanego',
      dane: undefined,
      mode: 'add'
    };
    const dialogRef = this.dialog
      .open(OfferHandModElemModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        const dane: OrderElem = {sort: 1, lp: '',
        description: res.description,
        name: res.name, code: res.code,
        price: res.price, pricePurchase: res.pricePurchase,
        priceAfterDiscount: res.priceAfterDiscount * res.quantity,
        priceBrutto: (res.priceAfterDiscount * res.quantity) * ((res.vat / 100) + 1),
        quantity: res.quantity, jm: res.jm,
        currency: this.offer.currency.name, vat: res.vat,
        type: res.type, orderId: this.offer.id,
        orderHeaderId: element.id,
        status: 1
       };
       this.store.dispatch(InsertOrderElemHandStart({orderElem: dane}));
    }});
  }

  addOrderElem(element: OrderHeader) {
    this.listOrderView = false;
    this.listOrderElemView = true;
    this.listOrderElemConfView = false;
    this.currentHeaderEdit = element.id;
  }


  addOrderElemConfig(element: OrderHeader) {
    this.listOrderView = false;
    this.listOrderElemView = false;
    this.listOrderElemConfView = true;
    this.currentHeaderEdit = element.id;
  }
  afterAddelem() {
    this.listOrderView = true;
    this.listOrderElemView = false;
    this.listOrderElemConfView = false;
    this.currentHeaderEdit = '';
  }
  editElementOffer(elem: OrderElem) {
    this.dispathElement();
    this.currentHeaderEdit = elem.orderHeaderId;
    this.currentOfferElemEdit = elem;
    if (elem.typ === 'OE') {
      const dialogConfig = defaultDialogConfig();
      dialogConfig.data = {
        dialogTitle: 'Edycja Elementu',
        dane: elem,
        mode: 'mod'
      };
      const dialogRef = this.dialog.open(OfferModElemModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
        if (res) {
          this.store.dispatch(updateOrderElemStart({ orderElem: res }));
        }
      }
      );
    }
    if (elem.typ === 'OEC') {
      this.router.navigate([`/offers/editc/${elem.orderId}/${elem.id}`]);
    }
    if (elem.typ === 'OEH') {
      const dialogConfig = defaultDialogConfig();
      dialogConfig.data = {
        dialogTitle: 'Dodanie elementu dopisanego',
        dane: elem,
        mode: 'edit'
      };
      const dialogRef = this.dialog
        .open(OfferHandModElemModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
         this.store.dispatch(UpdateOderElemHandStart({orderElem: res}));
      }});
    }
  }

  deleteorderElem(element: OrderElem) {
    const _title = 'Kasowanie pozycji';
    const _description = 'Czy element';
    const _waitDesciption = 'Product is deleting...';


    const dialogRef = this.layoutUtilsService
      .deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe((res: OrderElem) => {
      if (!res) {
        return;
      }
      console.log(res);
      if (element.typ === 'OE') {
        this.store.dispatch(deleteOrderElemStart({ orderElem: element }));
      }
      if (element.typ === 'OEC') {
        this.store.dispatch(deleteOrderConfStart({ orderElem: element }));
      }
      if (element.typ === 'OEH') {
        this.store.dispatch(DeleteOrderElemHanStart({ orderElem: element }));
      }
    });
  }

  dispathElement() {
    if (!this.loadList) {
      this.store.dispatch(ProductPriceOrderCustomerLoad
        ({
          producPriceParams: {
            category: '', filter: '',
            sortDirection: 'asc',
            sortField: 'name', pageIndex: 1,
            pageSize: 10, priceType: this.offer.customer.priceId,
            orderId: this.offer.id, custonerId: this.offer.customerId
          }
        }));
      this.loadList = true;
    }
  }
  sumaZakupu(elem: OrderElem[]) {
    if (elem.length > 0) {
      const sum: number = elem.map(s => s.pricePurchase * s.quantity).reduce((p, n) => p + n);
      return sum;
    }
    return 0;
  }
  sumWartosct(elem: OrderElem[]) {
    if (elem.length > 0) {
      return elem.map(s => (s.price * s.quantity)).reduce((p, n) => p + n);
    }
    return 0;
  }

  sumDiscount(elem: OrderElem[]) {
    if (elem.length > 0) {
      const sum: number = elem.map(s => s.priceAfterDiscount).reduce((p, n) => p + n);
      // this.offer.value = Object.assign({}, sum);
      return sum;
    }
    return 0;
  }
  sumBrutto(elem: OrderElem[]) {
    if (elem.length > 0) {
      return elem.map(s => s.priceBrutto).reduce((p, n) => p + n);
    }
    return 0;
  }


  sumTotalWartosct(elem: OrderHeader[]) {
    let total = 0;
    if (elem.length > 0) {
      elem.forEach(e => {
        total = total + e.orderElem.map(s => (s.price * s.quantity))
          .reduce((p, n) => p + n);
      });
    }
    return total;
  }

  refreshDiscount() {
    const _title = 'Upust ogólny';
    const _description = 'Ustawienie upustu ogólnego nadpisze upusty nadane na poszczególne pozycje';
    const _waitDesciption = 'Product is deleting...';


    const dialogRef = this.layoutUtilsService
      .deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.store.dispatch(
        UpdateDiscountOrder({ order: this.offer, discount: this.discount }));
    });
  }


  deleteHeader(header: OrderHeader) {
    const _title = 'Kasowanie nagłówka';
    const _description = 'Czy skasować nagłówek';
    const _waitDesciption = 'Product is deleting...';


    const dialogRef = this.layoutUtilsService
      .deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.store.dispatch(DeleteHeaderFoOrderStart({ orderHeader: header }));
    });
  }

}
