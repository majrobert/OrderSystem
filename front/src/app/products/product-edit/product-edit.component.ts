import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Products } from '../model/products';
import { Subscription } from 'rxjs';
import { getProduct, selectAllCategory } from '../products-state/products.selectors';
import { Category } from '../model/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductUpdateStart } from '../products-state/products.action';
import { PriceType } from 'src/app/price-list/model/PriceType';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit , OnDestroy{
  kategorie: Category[];
  priceType: PriceType[];
  
  productId: string;

  product: Products;
  public editor = ClassicEditor;
  prductForm: FormGroup;
  typeProduct = [{value : 1 , name: 'Towar'}, {value: 2, name: 'Product'}, {value: 3, name: 'Usługa'}];
  statusProduct = [{value: '1' , name: 'Aktywny'}, {value: '2', name: 'Nieaktywny'}];
  private subscription: Subscription[] = [];

  constructor(private route: ActivatedRoute ,
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productid');
   const productSub = this.store.pipe(select(getProduct(this.productId))).subscribe(
      (product: Products) => this.product = product
    );
    this.subscription.push(productSub);

    const kategorySub = this.store.pipe(select(selectAllCategory)).subscribe((data: Category[]) =>
    this.kategorie = data);
    this.subscription.push(kategorySub);
    this.initForm();
    this.initData();
  }

  initForm() {
    this.prductForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      code: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      vat: [23, [Validators.required]],
      jm: ['', Validators.required],
      type: [1],
      status: [],
      categoryProdId: ['', [Validators.required]]
    });

}

initData() {
this.prductForm.patchValue({...this.product});
this.prductForm.patchValue({status: this.product.status.toString()});
}

ngOnDestroy() {
  this.subscription.forEach(x => x.unsubscribe);
}

updateProduct(){
  const daneForm: Products = {...this.product,
  ...this.prductForm.value };
 // daneForm.categoryProd = this.product.categoryProd;
 console.log(daneForm);
  this.store.dispatch(ProductUpdateStart({product: daneForm}));
  this.router.navigate(['products']);
}

}// end class
