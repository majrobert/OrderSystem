import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryC } from './model/categoryC';
import { CustomersParams } from './model/customers-params';
import { CustomersResponce } from './model/customers-responce';
import { Customers } from './model/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  loadAllCategory(): Observable<CategoryC[]> {
    return this.http.get<CategoryC[]>(`${environment.urlService}/customer/category`);
  }

  insertCategory(category: CategoryC): Observable<CategoryC[]> {
    return this.http.post<CategoryC[]>(`${environment.urlService}/customer/category`,
      { Name: category.name, Details: category.details, Sort: category.sort });
  }
  updateCategory(category: CategoryC): Observable<CategoryC[]> {
    return this.http.post<CategoryC[]>(`${environment.urlService}/customer/categoryupdate`,
      { Id: category.id, Name: category.name, Details: category.details, Sort: category.sort });
  }

  deleteCategory(category: string): Observable<CategoryC[]> {
    return this.http.delete<CategoryC[]>(`${environment.urlService}/customer/category/${category}`);
  }

  // customers
  insertCustomers(customer: Customers): Observable<Customers> {
    return this.http.post<Customers>(`${environment.urlService}/customer`, customer);
  }
  getCustomers(custPar: CustomersParams): Observable<CustomersResponce> {
    return this.http.post<CustomersResponce>(`${environment.urlService}/customer/customerlist`, custPar);
  }
  updateCustomer(customer: Customers): Observable<Customers> {
    return this.http.put<Customers>(`${environment.urlService}/customer/${customer.id}`, customer);
  }
  deleteCustomer(customer: Customers): Observable<Customers> {
    return this.http.delete<Customers>(`${environment.urlService}/customer/${customer.id}`);
  }
  getCustomer(customerId: string): Observable<Customers> {
    return this.http.get<Customers>(`${environment.urlService}/customer/${customerId}`);
  }

}
