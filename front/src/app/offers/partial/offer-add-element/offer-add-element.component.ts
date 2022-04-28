import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { OrderElem } from '../../model/order-elem';
import { Order } from '../../model/order';
import { Subscription, Subject, merge } from 'rxjs';
import { Category } from 'src/app/products/model/category';
import { PriceType } from 'src/app/price-list/model/PriceType';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ProductPrice } from 'src/app/price-list/model/productPrice';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  selectAllProductPrice, getTotalProductPrice, selectAllCategory, selectAllProductListType,
  selectAllProductPriceOffer,
  getProductForOffer
} from 'src/app/price-list/price-list.selectors';
import { debounceTime, distinctUntilChanged, tap, first } from 'rxjs/operators';
import { ProductPriceLoadAction, ProductPriceOrderCustomerLoad } from 'src/app/price-list/price-list.action';
import { defaultDialogConfig } from 'src/app/shared/pipes/default-dialog-config';
import { OfferAddElemModalComponent } from '../offer-add-elem-modal/offer-add-elem-modal.component';
import { Products } from 'src/app/products/model/products';
import { insertOrderElemStart } from '../../state/offers.action';


@Component({
  selector: 'offer-add-element',
  templateUrl: './offer-add-element.component.html',
  styleUrls: ['./offer-add-element.component.css']
})
export class OfferAddElementComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscription: Subscription[] = [];
  kategorie: Category[];
  priceType: PriceType[];
  currentProduct: Products;
  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
  ) { }

  public dataSource: MatTableDataSource<ProductPrice>;
  public noData: ProductPrice[] = [<ProductPrice>{}];
  public displayedColumns: string[] = ['productCode', 'productName', 'cost', 'special', 'productVat',
    'productJm', 'productTyp', 'categoryProd', 'actions'];
  public productTotal: number;
  public defaultSort: Sort = { active: 'productCode', direction: 'asc' };
  public kateforiaList = '';
  public priceTypeList = '';
  private filter: string = '';
  // to do srore loading
  public loading: boolean = false;
  public filterSubject = new Subject<string>();
  private subscriptionForm: Subscription = new Subscription();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  @Input() headerid: string;
  @Input() offer: Order;
  @Input() elementEdit: OrderElem;
  @Output() addEmit: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    const productSub = this.store.pipe(select(selectAllProductPriceOffer)).subscribe(
      products => {
        // console.log(products);
        this.initializeData(products);
      }
    );
    this.subscription.push(productSub);
    console.log(this.elementEdit);
    const totalSub = this.store.pipe(select(getTotalProductPrice)).subscribe(
      total => this.productTotal = total
    );
    this.subscription.push(totalSub);

    const kategorieSub = this.store.pipe(select(selectAllCategory)).subscribe((data: Category[]) =>
      this.kategorie = data);
    this.subscription.push(kategorieSub);

    const priceTypeSub = this.store.pipe(select(selectAllProductListType)).subscribe((data) =>
      this.priceType = data);
    this.subscription.push(priceTypeSub);
  }

  public ngAfterViewInit() {
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));

    this.subscriptionForm.add(merge(filter$, sort$, this.paginator.page).pipe(
      tap(() => this.loadProducts())
    ).subscribe());
  }

  addElement(element: ProductPrice) {
    const productSub = this.store.pipe(
      select(getProductForOffer(element.productId)),
      first()
      ).subscribe(product => this.currentProduct = product);
    this.subscription.push(productSub);
  
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'dodaj pozycję',
      dane: element,
      mode: 'add'
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(OfferAddElemModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
       const dane: OrderElem = {sort: 1, lp: '',
       description: this.currentProduct.description,
       name: element.productName, code: element.productCode,
       price: element.cost, pricePurchase: this.currentProduct.price,
       priceAfterDiscount: res.cost * res.quantity,
       priceBrutto: (res.cost * res.quantity) * ((this.currentProduct.vat / 100) + 1),
       quantity: res.quantity, jm: this.currentProduct.jm,
       currency: this.offer.currency.name, vat: this.currentProduct.vat,
       type: this.currentProduct.type, orderId: this.offer.id,
       orderHeaderId: this.headerid, productId: element.productId, 
       status: 1
      };
      this.store.dispatch(insertOrderElemStart({orderElem: dane}));

       this.addEmit.emit(element.priceId);
    }
  });
}


  ngOnDestroy() {
    this.subscription.forEach(x => x.unsubscribe());
  }

  loadProducts() {
    this.store.dispatch(ProductPriceOrderCustomerLoad
      ({
        producPriceParams: {
          category: this.kateforiaList, filter: this.filter,
          sortDirection: this.sort.direction,
          sortField: this.sort.active, pageIndex: this.paginator.pageIndex + 1,
          pageSize: this.paginator.pageSize, priceType: this.offer.customer.priceId,
          orderId: this.offer.id, custonerId: this.offer.customerId
        }
      }));
  }
  toListOrder() {
    this.addEmit.emit('dolisty');
  }
  getItemTypString(typ: number = 0): string {
    switch (typ) {
      case 1:
        return 'Towar';
      case 2:
        return 'Produkt';
      case 3:
        return 'Usługa';
    }
    return '';
  }
  addProductelem(item: ProductPrice) {
    this.addEmit.emit(item.priceId);
  }
  private initializeData(products: ProductPrice[]): void {
    if (products) {
      this.dataSource = new MatTableDataSource(products.length ? products : this.noData);
    }
  }

}
