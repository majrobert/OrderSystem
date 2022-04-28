import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LayoutUtilsService } from 'src/app/shared/modules/partials-module/LayoutUtilsService';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { CategoryC } from '../../../../customers/model/categoryC';
import { Subscription, Subject, merge } from 'rxjs';
import { Customers } from '../../../../customers/model/customers';
import { PriceType } from 'src/app/price-list/model/PriceType';
import { selectAllCustomersCategory, getAllCustomersWithCategory, getTotalCustomers } from '../../../../customers/customers.selectors';
import { selectAllProductListType } from 'src/app/price-list/price-list.selectors';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { CustomersLoadActionStart, DeleteCustomerStart } from '../../../../customers/customers.action';


@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() mode: string;
  @Output() sendClient: EventEmitter<Customers> = new EventEmitter<Customers>();

  kategorie: CategoryC[] = [];
  priceType: PriceType[] = [];
  private subscription: Subscription[] = [];
  public displayedColumns: string[] = ['akronim', 'name', 'nip',
    'city', 'streed', 'zipCode', 'status', 'categoryCustomer', 'priceSpecs', 'actions'];
  public customerTotal: number;
  public defaultSort: Sort = { active: 'name', direction: 'asc' };
     // to do srore loading
     public loading: boolean = false;
  public kateforiaList = '';
  public statusList = '-1';
  priceList = '';
  private filter = '';

  public filterSubject = new Subject<string>();
  private subscriptionForm: Subscription = new Subscription();


  constructor(public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    private store: Store<AppState>) {
  }
  public dataSource: MatTableDataSource<Customers>;
  public noData: Customers[] = [<Customers>{}];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    if (this.mode === 'part') {
      this.displayedColumns =  ['akronim', 'name', 'nip',
      'city', 'streed', 'zipCode', 'status', 'categoryCustomer', 'priceSpecs', 'emit'];
    }
    const customerSub = this.store.pipe(select(getAllCustomersWithCategory)).subscribe(
      customers => {
        this.initializeData(customers);
      }
    );
    this.subscription.push(customerSub);
    const totalSub = this.store.pipe(select(getTotalCustomers)).subscribe(
      total => this.customerTotal = total
    );
    this.subscription.push(totalSub);

    const kategSub = this.store.pipe(select(selectAllCustomersCategory)).subscribe(
      data => this.kategorie = data
    );
    this.subscription.push(kategSub);

    const priceSub = this.store.pipe(select(selectAllProductListType)).subscribe(
      data => this.priceType = data
    );
    this.subscription.push(priceSub);
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
      tap(() => this.loadCustomers())
    ).subscribe());
  }

  addCustomer() {
    this.router.navigate(['customers/edit/0']);
  }

  loadCustomers() {
    console.log(this.filter);
    this.store.dispatch(CustomersLoadActionStart({
      customerspar: {
        filter: this.filter, status: +this.statusList,
        category: this.kateforiaList, pricegroup: this.priceList, sortDirection: this.sort.direction,
        sortField: this.sort.active, pageIndex: this.paginator.pageIndex + 1,
        pageSize: this.paginator.pageSize
      }
    }));
  }

  editCustomer(element: Customers) {
    this.router.navigate([`customers/edit/${element.id}`]);
  }

  deleteCategory(element: Customers) {
    const _title = 'Kasowanie pozycji';
    const _description = 'Czy skasować wybraną pozycję';
    const _waitDesciption = 'Product is deleting...';


    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.store.dispatch(DeleteCustomerStart({ customer: element }));
    });
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

  ngOnDestroy() {
    this.subscription.forEach(x => x.unsubscribe());
  }
  private initializeData(customers: Customers[]) {
    this.dataSource = new MatTableDataSource(customers.length ? customers : this.noData);
  }

  emitCustomer(customer: Customers) {
    this.sendClient.emit(customer);
  }

}
