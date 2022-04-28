import { Component, OnInit } from '@angular/core';
import { ProductConf } from '../model/productConf';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getProductConfWithCategory, getProductConfElem } from '../state/productConf.selector';
import { Products } from 'src/app/products/model/products';
import { defaultDialogConfig } from 'src/app/shared/pipes/default-dialog-config';
import { ProductAddModalComponent } from '../product-add-modal/product-add-modal.component';
import { ProductConfEditModalComponent } from '../product-conf-edit-modal/product-conf-edit-modal.component';
import { ProductConfElem } from '../model/productConfElem';
import { insertProductConfElemStart, deleteProductConfElemStart, updateProductConfElemSukccess } from '../state/procuctConf-action';
import { ProductUpdateStart } from 'src/app/products/products-state/products.action';

@Component({
  selector: 'product-conf-edit',
  templateUrl: './product-conf-edit.component.html',
  styleUrls: ['./product-conf-edit.component.css']
})
export class ProductConfEditComponent implements OnInit {


  productConfId: string;
  productConf: ProductConf;
  productConfElem: ProductConfElem[] = [];
  mode = 'part';

  private subscription: Subscription[] = [];
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.productConfId = this.route.snapshot.paramMap.get('productid');
    const productSub = this.store.pipe(select(getProductConfWithCategory(this.productConfId))).subscribe(
      (product: ProductConf) => this.productConf = product
    );
    this.subscription.push(productSub);
    const productContElemSub = this.store.pipe(select(getProductConfElem(this.productConfId)))
    .subscribe( data => this.productConfElem = data);
    this.subscription.push(productContElemSub);
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

  selectProduct(product: Products) {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Dodaj produkt',
      // {name: string, code: string, status: number, quantity: number, sort: number};
      product:{name: product.name, code: product.code,
        status: 1, quantity: 1, sort: 1} , // product,
      mode: 'add'
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(ProductAddModalComponent , dialogConfig);
    dialogRef.afterClosed().subscribe((res: {name: string, code: string, status: number, quantity: number, sort: number} ) => {
        if ( res !== undefined) {
          const prodConfElem: ProductConfElem = { quantity: res.quantity, sort: res.sort,
            status: res.status,
            productConfId: this.productConf.id, productId: product.id,
           code: product.code, name: product.name, description: product.description };
        this.store.dispatch(insertProductConfElemStart({productConfElem: prodConfElem}));
        }
      });
  }
  deleteProduct(element: ProductConfElem) {
      this.store.dispatch(deleteProductConfElemStart({productConfElem: element}));
  }
  editProductConf(element: ProductConfElem) {
    const dialogConfig = defaultDialogConfig();
    console.log(element);
    dialogConfig.data = {
      dialogTitle: 'Aktualizuj produkt',
       // {name: string, code: string, status: number, quantity: number, sort: number};
       product: { name: element.name, code: element.code, quantity: element.quantity,
         sort: element.sort, status: element.status }   , // this.productConf,
      mode: 'update'
    };
    const dialogRef = this.dialog.open(ProductAddModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>
      {if (res !== undefined) {
        const dane = { ...element, ...res , ...{status: +res.status}};
        this.store.dispatch(updateProductConfElemSukccess({productConfElem: dane}));
      }});
  }

}
