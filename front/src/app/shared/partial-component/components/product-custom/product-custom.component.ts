import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { LayoutUtilsService } from 'src/app/shared/modules/partials-module/LayoutUtilsService';
import { Subscription, Subject, merge } from 'rxjs';
import { Category } from 'src/app/products/model/category';
import { ProductConf } from '../../../../product-conf/model/productConf';
import { selectAllCategory } from 'src/app/price-list/price-list.selectors';
import {
  getTotalProductConf,
  getAllProductsConfWitchCategory
} from '../../../../product-conf/state/productConf.selector';
import { ProductsConfigListLoadStart, productConfDeleteStart } from '../../../../product-conf/state/procuctConf-action';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Order } from 'src/app/offers/model/order';
import { OrderElem } from 'src/app/offers/model/order-elem';
import { InsertOrderElemConfStart } from 'src/app/offers/state/offers.action';

@Component({
  selector: 'product-custom',
  templateUrl: './product-custom.component.html',
  styleUrls: ['./product-custom.component.css']
})
export class ProductCustomComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscription: Subscription[] = [];
  kategorie: Category[];

  constructor(
    private store: Store<AppState>,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router) { }

  public dataSource: MatTableDataSource<ProductConf>;
  public noData: ProductConf[] = [<ProductConf>{}];
  public displayedColumns: string[] = ['code', 'name', 'price', 'vat', 'Jm', 'typ', 'status', 'category', 'actions'];
  public productTotal: number;
  public defaultSort: Sort = { active: 'code', direction: 'asc' };
  public kateforiaList = '';
  public statusList = '-1';
  private filter = '';
   // to do srore loading
   public loading: boolean = false;

  public filterSubject = new Subject<string>();
  private subscriptionForm: Subscription = new Subscription();

  @Input() mode: string;
  @Input() headerid: string;
  @Input() offer: Order;
  @Output() addEmit: EventEmitter<String> = new EventEmitter<String>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {


    if (this.mode === 'part') {
      this.displayedColumns = ['code', 'name', 'vat', 'Jm', 'typ', 'status', 'category', 'add'];
    }

    const productSub = this.store.pipe(select(getAllProductsConfWitchCategory)).subscribe(
      products => { this.initializeData(products); }
    );
    this.subscription.push(productSub);

    const totalSub = this.store.pipe(select(getTotalProductConf)).subscribe(
      total => this.productTotal = total
    );
    this.subscription.push(totalSub);
    // getTotalProduct
    const kategorieSub = this.store.pipe(select(selectAllCategory)).subscribe((data: Category[]) =>
      this.kategorie = data);
    this.subscription.push(kategorieSub);
  }

  public ngAfterViewInit() {
    const filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    const sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));

    this.subscriptionForm.add(merge(filter$, sort$, this.paginator.page).pipe(
      tap(() => this.loadProducts())
    ).subscribe());
  }

  getItemStatusString(status: number = 0): string {
    switch (status) {
      case 2:
        return 'nie aktywny';
      case 1:
        return 'aktywny';
    }
    return '';
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
  deleteProduct(element: ProductConf) {
    this.store.dispatch(productConfDeleteStart({ productConf: element }));
  }
  editProduct(id: string) {
    this.router.navigate([`productconf/edit/${id}`]);
  }

  ngOnDestroy() {
    this.subscription.forEach(x => x.unsubscribe());
  }

  toOrder() {
    this.addEmit.emit('product');
  }
  AddProductToOfer(element: ProductConf) {
    console.log(element);
    const dane: OrderElem = {
      sort: 1, lp: '', description: element.description,
      name: element.name, code: element.code, price: 0, pricePurchase: 0,
      priceAfterDiscount: 0, priceBrutto: 0, quantity: 1, jm: element.jm,
      currency: this.offer.currency.name, vat: element.vat, type: element.type,
      orderId: this.offer.id, orderHeaderId: this.headerid, productConfId: element.id,
      status: 1
    };
    this.store.dispatch(InsertOrderElemConfStart({ orderElem: dane }));
  }

   loadProducts() {
    this.store.dispatch(ProductsConfigListLoadStart
      ({
        productConfParam: {
          category: this.kateforiaList, status: +this.statusList, filter: this.filter,
          sortDirection: this.sort.direction,
          sortField: this.sort.active, pageIndex: this.paginator.pageIndex + 1,
          pageSize: this.paginator.pageSize
        }
      }));
  }
  private initializeData(products: ProductConf[]): void {
    this.dataSource = new MatTableDataSource(products.length ? products : this.noData);
  }

}
