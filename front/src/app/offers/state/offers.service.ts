import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../model/currency';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order';
import { OrdersParams } from '../model/orders-params';
import { OrderHeader } from '../model/order-header';
import { OrderElem } from '../model/order-elem';
import { ProductConf } from 'src/app/product-conf/model/productConf';
import { Products } from 'src/app/products/model/products';
import { ProductPrice } from 'src/app/price-list/model/productPrice';
import { PriceSpec } from 'src/app/price-list/model/priceSpec';
import { ProductConfElem } from 'src/app/product-conf/model/productConfElem';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { }

  loadAllCurrency(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${environment.urlService}/order/currency`);
  }
  updateCurrency(currency: Currency): Observable<Currency> {
    return this.http.put<Currency>
      (`${environment.urlService}/order/currency/${currency.id}`, currency);
  }
  insertCurrency(currency: Currency): Observable<Currency> {
    return this.http.post<Currency>(`${environment.urlService}/order/currency`, currency);
  }
  insertOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.urlService}/order`, order);
  }
  loadOffersList(orderPar: OrdersParams): Observable<{ orders: Order[], total: number }> {
    return this.http.post<{ orders: Order[], total: number }>
      (`${environment.urlService}/order/list`, orderPar);
  }
  deleteorder(order: Order): Observable<Order> {
    return this.http.delete<Order>(`${environment.urlService}/order/${order.id}`);
  }
  insertOrderHeader(orderHeader: OrderHeader): Observable<OrderHeader> {
    return this.http.post<OrderHeader>(`${environment.urlService}/order/orderheader`, orderHeader);
  }
  loadOrderElemHeader(orderid: string): Observable<{ order: Order,
    orderHeader: OrderHeader[],
    orderElem: OrderElem[], orderElemConf: OrderElem[], orderElemHand: OrderElem[]
  }> {
    return this.http.get<{ order: Order
      orderHeader: OrderHeader[], orderElem: OrderElem[], orderElemConf: OrderElem[],
      orderElemHand: OrderElem[]
    }>(`${environment.urlService}/order/orderheader/${orderid}`);
  }
  deledeOrderHeader(orderHeader: OrderHeader): Observable<OrderHeader> {
    return this.http.delete<OrderHeader>(`${environment.urlService}/order/header/${orderHeader.id}`);
  }
  updateOrderHeader(orderHeader: OrderHeader): Observable<OrderHeader> {
    return this.http.put<OrderHeader>
    (`${environment.urlService}/order/orderheader/${orderHeader.id}`, orderHeader);
  }
  updateDiscountOrder(order: Order, discount: number): Observable<{
    orderHeader: OrderHeader[],
    orderElem: OrderElem[], orderElemConf: OrderElem[], orderElemHand: OrderElem[]
  }> {
    return this.http.post<{orderHeader: OrderHeader[], orderElem: OrderElem[], orderElemConf: OrderElem[],
      orderElemHand: OrderElem[]}>(`${environment.urlService}/order/discount/${order.id}`, discount);
  }
  insertOrderElem(orderElem: OrderElem): Observable<OrderElem> {
    return this.http.post<OrderElem>(`${environment.urlService}/order/orderelem`, orderElem);
  }
  updateOrderelem(orderElem: OrderElem): Observable<OrderElem> {
    return this.http.put<OrderElem>(`${environment.urlService}/order/orderelem/${orderElem.id}`, orderElem);
  }
  deleteOrderElement(orderElem: OrderElem): Observable<OrderElem> {
    return this.http.delete<OrderElem>(`${environment.urlService}/order/orderelem/${orderElem.id}`);
  }
  insertOrderElemConf(orderElem: OrderElem): Observable<OrderElem> {
    return this.http.post<OrderElem>(`${environment.urlService}/order/orderconf/`, orderElem);
  }
  loadOrdersElemCofig(orderElemConfId: string)
  : Observable<
  {product: Products[],
    orderSElemConf: OrderElem[],
    productConfElem: ProductConfElem[],
    productPrice: ProductPrice[],
    priceSpec: PriceSpec[],
  }> {
    return this.http.get<{product: Products[],
      orderSElemConf: OrderElem[],
      productConfElem: ProductConfElem[],
      productPrice: ProductPrice[],
      priceSpec: PriceSpec[]}>
      (`${environment.urlService}/order/orderconf/${orderElemConfId}`);
  }
  InsertOrderSElem(orderSElem: OrderElem):
  Observable<{orderSElemConf: OrderElem, orderElem: OrderElem}> {
    return this.http.post<{orderSElemConf: OrderElem, orderElem: OrderElem}>
    (`${environment.urlService}/order/orderselem/`, orderSElem);
  }
  DeleteOrderSElem(orderSElem: OrderElem):
  Observable<{orderSElemConf: OrderElem, orderElem: OrderElem}> {
    return this.http.delete<{orderSElemConf: OrderElem, orderElem: OrderElem}>
    (`${environment.urlService}/order/orderselem/${orderSElem.id}`);
  }
  UpdateOrderSElem(orderSElem: OrderElem):
   Observable<{orderSElemConf: OrderElem, orderElem: OrderElem}> {
    return this.http.put<{orderSElemConf: OrderElem, orderElem: OrderElem}>
    (`${environment.urlService}/order/orderselem/${orderSElem.id}`, orderSElem);
  }
  UpdateOrderElemConfig(orderElemConf: OrderElem): Observable<OrderElem> {
    return this.http.put<OrderElem>
    (`${environment.urlService}/order/orderelemconf/${orderElemConf.id}`
    , orderElemConf);
  }
  DeleteOrderelemConf(orderElemConf: OrderElem): Observable<OrderElem> {
    return this.http.delete<OrderElem>
    (`${environment.urlService}/order/orderelemconf/${orderElemConf.id}`);
  }
  InsertOrderElemHand(orderElemHand: OrderElem): Observable<OrderElem> {
    return this.http.post<OrderElem>
    (`${environment.urlService}/order/orderelemhand`, orderElemHand);
  }
  UpdateOrderElemHand(orderElemHand: OrderElem): Observable<OrderElem> {
    return this.http.put<OrderElem>
    (`${environment.urlService}/order/orderelemhand/${orderElemHand.id}`, orderElemHand);
  }
  DeleteOrderElemHand(orderElemHand: OrderElem): Observable<OrderElem> {
    return this.http.delete<OrderElem>
    (`${environment.urlService}/order/orderelemhand/${orderElemHand.id}`);
  }
}
