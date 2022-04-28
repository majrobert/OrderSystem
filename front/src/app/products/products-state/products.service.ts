import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { environment } from 'src/environments/environment';
import { Products } from '../model/products';
import { ProductsParams } from '../model/products-params';
import { ProductsResponce } from '../model/products-responce';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  loadAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.urlService}/products/category`);
  }

  insertCategory(category: Category): Observable<Category[]> {
    return this.http.post<Category[]>(`${environment.urlService}/products/category`, 
    { Name: category.name, Details: category.details, Sort: category.sort});
  }
  updateCategory(category: Category): Observable<Category[]> {
    return this.http.post<Category[]>(`${environment.urlService}/products/categoryupdate`,
    {Id: category.id,  Name: category.name, Details: category.details, Sort: category.sort});
  }

  deleteCategory(category: string): Observable<Category[]> {
    return this.http.delete<Category[]>(`${environment.urlService}/products/category/${category}`);
  }
  insertProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(`${environment.urlService}/products`, product);
  }
  getProducts(product: ProductsParams): Observable<ProductsResponce> {
    return this.http.post<ProductsResponce>(`${environment.urlService}/products/productslist`, product)
  }
  deleteProduct(product: Products): Observable<boolean>{
    return this.http.delete<boolean>(`${environment.urlService}/products/${product.id}`).pipe();
  }
  updateProduct(product: Products): Observable<Products> {
    return this.http.put<Products>(`${environment.urlService}/products/${product.id}`, product);
  }

  } // end service

