import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductConf } from '../model/productConf';
import { ProductsConfParams } from '../model/productConfParams';
import { ProductConfElem } from '../model/productConfElem';


@Injectable({
  providedIn: 'root'
})

export class ProductConfService {

  constructor(private http: HttpClient) { }

  insertProductConf(productConf: ProductConf): Observable<ProductConf> {
    return this.http.post<ProductConf>(`${environment.urlService}/productconf`, productConf);
  }

  getProductCofList( params: ProductsConfParams)
  : Observable<{total: number, productConf: ProductConf[],
    productConfElem: ProductConfElem[]}> {
      return this.http.post<{total: number, productConf: ProductConf[],
        productConfElem: ProductConfElem[]}>(`${environment.urlService}/productconf/list`, params);
    }
  deleteProductConf(productConf: ProductConf): Observable<ProductConf> {
     return this.http.delete<ProductConf>(`${environment.urlService}/productconf/${productConf.id}`);
  }
  updateProductConf(productConf: ProductConf): Observable<ProductConf> {
    return  this.http.put<ProductConf>(`${environment.urlService}/productconf/${productConf.id}`, productConf);
  }
  insertOroductConfElem(product: ProductConfElem): Observable<ProductConfElem> {
    return this.http.post<ProductConfElem>(`${environment.urlService}/productconf/elem`, product);
  }
  deleteProductConfElem(product: ProductConfElem): Observable<ProductConfElem> {
    return this.http.delete<ProductConfElem>(`${environment.urlService}/productconf/elem/${product.id}`);
  }
  updateProductConfElem(product: ProductConfElem): Observable<ProductConfElem> {
    return this.http.put<ProductConfElem>(`${environment.urlService}/productconf/elem/${product.id}`, product);
  }

}

