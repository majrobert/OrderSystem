import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LayoutUtilsService } from 'src/app/shared/modules/partials-module/LayoutUtilsService';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ProductEditDialogComponent } from '../../../../products/product-add/product-edit-dialog.component';
import { defaultDialogConfig } from 'src/app/shared/pipes/default-dialog-config';
import { Products } from '../../../../products/model/products';
import {
  getAllProducts, selectProductState,
  getTotalProducts, selectAllCategory,
  getAllProductsWitchCategory
} from '../../../../products/products-state/products.selectors';
import { Subscription, Subject, merge } from 'rxjs';
import { Category } from '../../../../products/model/category';
import { ProductDeleteStartAction, ProductsLoadAction } from '../../../../products/products-state/products.action';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {


  private subscription: Subscription[] = [];
  kategorie: Category[];

  constructor(
    private layoutUtilsService: LayoutUtilsService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  public dataSource: MatTableDataSource<Products>;
  public noData: Products[] = [<Products>{}];
  public displayedColumns: string[] = ['code', 'name', 'price', 'vat', 'Jm', 'typ', 'status', 'category', 'actions'];
  public productTotal: number;
  public defaultSort: Sort = { active: 'code', direction: 'asc' };
  public kateforiaList = '';
  public statusList = '-1';
  private filter: string = '';
   // to do srore loading
   public loading: boolean = false;

  public filterSubject = new Subject<string>();
  private subscriptionForm: Subscription = new Subscription();

  @Input() mode: string;
  @Output() sendProduct: EventEmitter<Products> = new EventEmitter<Products>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    if (this.mode === 'part') {
      this.displayedColumns =  ['code', 'name', 'price', 'Jm', 'emit'];
    }
    const productSub = this.store.pipe(select(getAllProductsWitchCategory)).subscribe(
      products => { this.initializeData(products); }
    );
    this.subscription.push(productSub);

    const totalSub = this.store.pipe(select(getTotalProducts)).subscribe(
      total => this.productTotal = total
    );
    this.subscription.push(totalSub);

    const kategorieSub = this.store.pipe(select(selectAllCategory)).subscribe((data: Category[]) =>
      this.kategorie = data);
    this.subscription.push(kategorieSub);

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
    this.store.dispatch(ProductsLoadAction
      ({
        product: {
          category: this.kateforiaList, status: +this.statusList, filter: this.filter,
          sortDirection: this.sort.direction,
          sortField: this.sort.active, pageIndex: this.paginator.pageIndex + 1,
          pageSize: this.paginator.pageSize
        }
      }));
  }




  editProduct(id: number) {
    this.router.navigate([`products/edit/${id}`]);
  }

  viewProduct(element: Products) {
    this.router.navigate([`products/view/${element.id}`]);
  }

  deleteProduct(product: Products) {
    const _title = 'Kasowanie pozycji';
    const _description = 'Czy skasować wybraną pozycję';
    const _waitDesciption = 'Product is deleting...';


    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.store.dispatch(ProductDeleteStartAction({ product }));
      // this.store.dispatch(new OneProductDeleted({ id: _item.id }));
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

  private initializeData(products: Products[]): void {
    this.dataSource = new MatTableDataSource(products.length ? products : this.noData);
  }

  emitProduct(product: Products) {
    this.sendProduct.emit(product);
  }

}
