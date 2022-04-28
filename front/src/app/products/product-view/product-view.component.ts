import { Component, OnInit, OnDestroy } from '@angular/core';
import { Products } from '../model/products';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getProduct, getProductWithCategory } from '../products-state/products.selectors';
import { selectAllProductListType,
   getPriceTypeWithProductPriceForProduct, 
   getProductSpecialPriceForCustomer } from 'src/app/price-list/price-list.selectors';
import { PriceType } from 'src/app/price-list/model/PriceType';
import { ProductPricesLoad } from 'src/app/price-list/price-list.action';
import { Customers } from 'src/app/customers/model/customers';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { defaultDialogConfig } from 'src/app/shared/pipes/default-dialog-config';
import { ProductPriceAddEditModalComponent } from '../product-price-add-edit-modal/product-price-add-edit-modal.component';

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {

  productId: string;
  product: Products;
  priceList = '';
  priceType: PriceType[] = [];
  priceTypeWitchProductPrice: PriceType[] = [];
  customerwitchPrice: Customers[] = [];
  private subscription: Subscription[] = [];
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
    ) { }

  ngOnInit() {

    this.productId = this.route.snapshot.paramMap.get('productid');
    this.store.dispatch(ProductPricesLoad({ productId: this.productId}));
    const productSub = this.store.pipe(select(getProductWithCategory(this.productId))).subscribe(
      (product: Products) => this.product = product
    );
    this.subscription.push(productSub);

    const priceSub = this.store.pipe(select(selectAllProductListType)).subscribe(
      data => this.priceType = data
    );
    this.subscription.push(priceSub);

     const priceTypePricePub = this.store.pipe(select(getPriceTypeWithProductPriceForProduct(this.productId))).subscribe(
     data =>  this.priceTypeWitchProductPrice = data
    );
    this.subscription.push(priceTypePricePub);
   const custSub =  this.store.pipe(
     select(getProductSpecialPriceForCustomer(this.productId),
     first())).subscribe( 
      data => this.customerwitchPrice = data);
    this.subscription.push(custSub)
// getProductSpecialPriceForCustomer
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

  ngOnDestroy() {
    this.subscription.forEach(x => x.unsubscribe);
  }
  addPrice(price: PriceType){
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Dodaj cenę',
      price: parseFloat((price.margin * this.product.price).toString()).toFixed(2),
      priceType: price,
      product: this.product,
      mode: 'add'
     };
     dialogConfig.width = '500px';
     const dialogRef = this.dialog.open(ProductPriceAddEditModalComponent, dialogConfig);
     dialogRef.afterClosed().subscribe( res =>
      console.log(res) );
  }
  updatePrice(price: PriceType){
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: 'Aktualizuj cenę',
      price: price.cost,
      priceType: price,
      product: this.product,
      mode: 'update'
     };
     dialogConfig.width = '500px';
     const dialogRef = this.dialog.open(ProductPriceAddEditModalComponent, dialogConfig);
     dialogRef.afterClosed().subscribe( res =>
      console.log(res) );
  }


}
