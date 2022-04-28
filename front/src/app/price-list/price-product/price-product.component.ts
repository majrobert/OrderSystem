import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Category } from 'src/app/products/model/category';
import { Subscription, Subject, merge } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductPrice } from '../model/productPrice';
import { selectAllProductPrice, getTotalProductPrice, selectAllProductListType } from '../price-list.selectors';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { selectAllCategory } from 'src/app/products/products-state/products.selectors';
import { PriceType } from '../model/PriceType';
import { ProductPriceLoadAction } from '../price-list.action';

@Component({
  selector: 'price-product',
  templateUrl: './price-product.component.html',
  styleUrls: ['./price-product.component.css']
})
export class PriceProductComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscription: Subscription[] = [];
  kategorie: Category[];
  priceType: PriceType[];

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  public dataSource: MatTableDataSource<ProductPrice>;
  public noData: ProductPrice[] = [<ProductPrice>{}];
  public displayedColumns: string[] = ['productCode', 'productName', 'cost', 'productVat',
   'productJm', 'productTyp', 'categoryProd', 'priceName'];
   public productTotal: number;
   public defaultSort: Sort = { active: 'productCode', direction: 'asc' };
   public kateforiaList = '';
   public  priceTypeList ='';
   private filter: string = '';
    // to do srore loading
    public loading: boolean = false;
   public filterSubject = new Subject<string>();
  private subscriptionForm: Subscription = new Subscription();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit() {
    const productSub = this.store.pipe(select(selectAllProductPrice)).subscribe(
      products => {
        this.initializeData(products); }
    );
    this.subscription.push(productSub);

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

  ngOnDestroy() {
    this.subscription.forEach(x => x.unsubscribe());
  }

  loadProducts() {
    this.store.dispatch(ProductPriceLoadAction
      ({
        producPriceParams: {
          category: this.kateforiaList,  filter: this.filter,
          sortDirection: this.sort.direction,
          sortField: this.sort.active, pageIndex: this.paginator.pageIndex + 1,
          pageSize: this.paginator.pageSize, priceType: this.priceTypeList
        }
      }));
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

  private initializeData(products: ProductPrice[]): void {
    this.dataSource = new MatTableDataSource(products.length ? products : this.noData);
  }

}
