import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getAllOrders, getTotalOrderList, getAllCurrency } from '../state/offers.selectors';
import { Order } from '../model/order';
import { OrderListLoadStart, OrderDeleteStart } from '../state/offers.action';
import { Currency } from '../model/currency';
import { LayoutUtilsService } from 'src/app/shared/modules/partials-module/LayoutUtilsService';

@Component({
  selector: 'offerslist',
  templateUrl: './offerslist.component.html',
  styleUrls: ['./offerslist.component.css']
})
export class OfferslistComponent implements OnInit , OnDestroy, AfterViewInit  {

  private subscription: Subscription[] = [];
  data_od: Date;
  data_do: Date;
  seriaList: string;
  statusList: string;
  orderListTotal: number;
  currencyList: string;
  currency: Currency[];
  private filter: string = '';
  // to do srore loading
  public loading: boolean = false;
  public filterSubject = new Subject<string>();
  private subscriptionForm: Subscription = new Subscription();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
    private store: Store<AppState>, private layoutUtilsService: LayoutUtilsService,) { }
    public dataSource: MatTableDataSource<Order>;
    public noData: Order[] = [<Order>{}];
    public displayedColumns: string[] = ['numberYear', 'customer_akronim', 'customer_name', 
    'dateCreation', 'currency_name', 'value', 'status', 'actions'];
    public defaultSort: Sort = { active: 'numberYear', direction: 'asc' };

  ngOnInit() {
    this.data_od = new Date((new Date()).getTime() - 30 * 24 * 60 * 60 * 1000 );
    this.data_do = new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000 );
    this.seriaList = 'FS1';
    this.statusList = '-1';

    const orderListSub = this.store.pipe(
      select(getAllOrders)).subscribe(
        orders => {
           this.initializeData(orders);
        }
      );

    const totalSub = this.store.pipe(
      select(getTotalOrderList)).subscribe(
       total => this.orderListTotal = total
      );
      this.subscription.push(totalSub);

      const currencySub = this.store.pipe(select(getAllCurrency)).subscribe(
        (data: Currency[]) => this.currency = data
      );
      this.subscription.push(currencySub);
  }

  addOffer() {
    this.router.navigate(['/offers/edith/0']);
  }

  ngOnDestroy() {
  }
  public ngAfterViewInit() {
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
        console.log(value);
      })
    );

     let sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));

      this.subscriptionForm.add(merge(filter$, sort$, this.paginator.page).pipe(
        tap(() => this.loladOrders())
      ).subscribe());
  }
  loladOrders() {
    console.log('sel');
    this.store.dispatch(OrderListLoadStart({
      Orderparam: {
          dateStart: this.data_od, dateEnd: this.data_do,
          currencyId: this.currencyList,
          status: +this.statusList, filter: this.filter, sortDirection: this.sort.direction,
          sortField: this.sort.active , pageIndex: this.paginator.pageIndex + 1, series: this.seriaList,
          pageSize: this.paginator.pageSize,
      }
  }));
  }

  private initializeData(products: Order[]): void {
    this.dataSource = new MatTableDataSource(products.length ? products : this.noData);
  }

  deleteorder(element: Order){
    const _title = 'Kasowanie pozycji';
    const _description = 'Czy skasować wybraną pozycję';
    const _waitDesciption = 'Product is deleting...';
    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.store.dispatch(OrderDeleteStart({ order: element}));
    });
  }

  editOffer(element: Order) {
    this.router.navigate([`/offers/edit/${element.id}`]);
  }

  viewOrder(element: Order) {
    this.router.navigate([`/offers/view/${element.id}`]);
  }
}
