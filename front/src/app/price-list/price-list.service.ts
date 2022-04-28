import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriceType } from './model/PriceType';
import { environment } from 'src/environments/environment';
import { ProductPriceResponce } from './model/productPrice-responce';
import { ProductPriceParams } from './model/productPrice-params';
import { ProductPrice } from './model/productPrice';
import { Customers } from '../customers/model/customers';
import { PriceSpec } from './model/priceSpec';
import { Products } from '../products/model/products';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  constructor(private http: HttpClient) { }

  loadAllPricetype(): Observable<PriceType[]> {
    return this.http.get<PriceType[]>(`${environment.urlService}/pricelist/type`);
  }
  updatePriceType(pricelisttype: PriceType): Observable<PriceType[]> {
    return this.http.put<PriceType[]>
      (`${environment.urlService}/pricelist/type/${pricelisttype.id}`, pricelisttype);
  }

  loadProductPrice(priceParam: ProductPriceParams): Observable<ProductPriceResponce> {
    return this.http.post<ProductPriceResponce>(`${environment.urlService}/pricelist/pricelist`, priceParam);
  }
  getPricesForProduct(productId: string): Observable<{ productPrice: ProductPrice[], priceSpec: PriceSpec[], customer: Customers[] }> {
    return this.http.get<{ productPrice: ProductPrice[], priceSpec: PriceSpec[], customer: Customers[] }>
      (`${environment.urlService}/pricelist/productprice/${productId}`);
  }
  insertProductPrice(product: Products, priceType: PriceType): Observable<ProductPrice[]> {
    const prodPrice = { cost: priceType.cost, productId: product.id, priceId: priceType.id };
    return this.http.post<ProductPrice[]>(`${environment.urlService}/pricelist/productprice/`, prodPrice);
  }
  updateProductPrice(product: Products, priceType: PriceType): Observable<ProductPrice[]> {
    const prodPrice = { cost: priceType.cost, productId: product.id, priceId: priceType.id };
    return this.http.put<ProductPrice[]>(`${environment.urlService}/pricelist/productprice/${product.id}`, prodPrice);
  }
  loadProductPriceOrderCustomer(priceParam: ProductPriceParams): 
  Observable<{total: number, productPrice: ProductPrice[], priceSpec: PriceSpec[],
    product: Products[]}>{
    return this.http.post<{total: number, productPrice: ProductPrice[], priceSpec: PriceSpec[],
      product: Products[]}>
      (`${environment.urlService}/pricelist/pricelistorder/${priceParam.orderId}/${priceParam.custonerId}`
      , priceParam);
  }
}
