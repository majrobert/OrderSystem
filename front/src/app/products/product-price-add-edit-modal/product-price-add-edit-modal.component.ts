import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Products } from '../model/products';
import { PriceType } from 'src/app/price-list/model/PriceType';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AddProductPriceToProductStart, UpdateProductPriceToProduct } from 'src/app/price-list/price-list.action';

@Component({
  selector: 'product-price-add-edit-modal',
  templateUrl: './product-price-add-edit-modal.component.html',
  styleUrls: ['./product-price-add-edit-modal.component.css']
})
export class ProductPriceAddEditModalComponent implements OnInit {

  product: Products;
  mode: string;
  price: number;
  priceType: PriceType;
  title = '';

  constructor(public dialogRef: MatDialogRef<ProductPriceAddEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private store: Store<AppState>) {
    this.title = data.dialogTitle;
    this.price = data.price;
    this.priceType = Object.assign({}, data.priceType);
    this.product = data.product;
    this.mode = data.mode;
  }

  ngOnInit() {
  }

  dodajCene() {
    this.priceType = Object.assign({}, this.priceType, {
      cost: this.price
    } );
console.log(this.mode);
    if (this.mode === 'add') {
      console.log('add')
      this.store.dispatch(AddProductPriceToProductStart
        ({ product: this.product, priceType: this.priceType }));
      this.dialogRef.close('kkkk');
    }
    if (this.mode === 'update') {
      console.log('update')
      this.store.dispatch(UpdateProductPriceToProduct
        ({ product: this.product, priceType: this.priceType }));
      this.dialogRef.close('kkkk');
    }

  }

}
