import { createAction, props } from '@ngrx/store';
import { Currency } from '../model/currency';
import { Order } from '../model/order';
import { OrdersParams } from '../model/orders-params';
import { OrderHeader } from '../model/order-header';
import { OrderElem } from '../model/order-elem';
import { Update } from '@ngrx/entity';
import { Products } from 'src/app/products/model/products';
import { ProductConf } from 'src/app/product-conf/model/productConf';
import { ProductPrice } from 'src/app/price-list/model/productPrice';
import { PriceSpec } from 'src/app/price-list/model/priceSpec';
import { ProductConfElem } from 'src/app/product-conf/model/productConfElem';

export const loadAllCurrencyStart = createAction(
    '[Currency m] start load'
);
export const loadAllCurrencySuccess = createAction(
    '[Curreny m] curreny load success',
    props<{ currency: Currency[] }>()
);
export const updateCurrencyStart = createAction(
    '[Currency m] update start',
    props<{ currency: Currency }>()
);
export const updateCurrencySuccess = createAction(
    '[Currency m] update success',
    props<{ currency: Currency }>()
);
export const insertCurrencyStart = createAction(
    '[Currency m] currency insert start',
    props<{ currency: Currency }>()
);
export const inserCurrencySuccess = createAction(
    '[Currency m] curency insert success',
    props<{ currency: Currency }>()
);
export const insertOrderStart = createAction(
    '[Order m] start insert',
    props<{ order: Order }>()
);
export const InsertOrderSukcess = createAction(
    '[Order m] insert order success',
    props<{ order: Order }>()
);
export const LoadOrderSuccessResolver = createAction(
    '[Order m] load order success resolver',
    props<{ order: Order}>()
)
export const OrderListLoadStart = createAction(
    '[Order m] order list start load',
    props<{ Orderparam: OrdersParams }>()
);
export const OrderListLoadSuccess = createAction(
    '[Orders m] order list load success',
    props<{ orders: Order[], total: number }>()
);
export const OrderDeleteStart = createAction(
    '[order m] delete order poz',
    props<{ order: Order }>()
);
export const OrderDeleteSuccess = createAction(
    '[Order] start delete poz',
    props<{ order: Order }>()
);
// orderHeader
export const insertOrderHeaderStart = createAction(
    '[Order header] insert start',
    props<{ orderHeader: OrderHeader }>()
);
export const insertOrderHeaderSuccess = createAction(
    '[Order header] insert success',
    props<{ orderHeader: OrderHeader }>()
);
export const UpdateOrderHeaderStart = createAction (
    '[Order Header] update start',
    props<{orderHeader: OrderHeader}>()
);
export const UpdateOrderHeaderSukcess = createAction (
    '[order Header] update sukcess',
    props<{orderHeader: OrderHeader}>()
);
export const OrderloadElemStart = createAction(
    '[Order elem] order elem load start',
    props<{ orderId: string }>()
);
export const OrderloadElemHeaderSuccess = createAction(
    '[order elem header] order load success',
    props<{ orderHeader: OrderHeader[] }>()
);
export const OrderloadElemSuccess = createAction(
    '[order Elem] order load success',
    props<{ orderElem: OrderElem[] }>()
);
export const DeleteHeaderFoOrderStart = createAction(
    '[Order header] start delete',
    props<{ orderHeader: OrderHeader }>()
);
export const DeleteHeaderFoOrderSukcess = createAction(
    '[order header] success delete',
    props<{ orderHeader: OrderHeader }>()
);
export const UpdateDiscountOrder = createAction(
    '[Order m] update discount start',
    props<{ order: Order, discount: number }>()
);
export const UpdateDiscountSucces = createAction(
    '[Order m] uppdate sucess',
    props<{ partial: Update<OrderElem>[] }>()
);
export const insertOrderElemStart = createAction(
    '[order elem ] start insert',
    props<{ orderElem: OrderElem }>()
);
export const insertOrderElemSuccess = createAction(
    '[Order Elem] insert success',
    props<{ orderElem: OrderElem }>()
);
export const updateOrderElemStart = createAction(
    '[Order elem] update start',
    props<{ orderElem: OrderElem}>()
);
export const updateOrderElemSuccess = createAction(
    '[Order Element] update success',
    props<{ orderElem: OrderElem , 
        partialOrderElem: Update<OrderElem>}>()
);
export const deleteOrderElemStart = createAction(
    '[Order elem] delete start',
    props<{ orderElem: OrderElem }>()
);
export const deleteOrderElemSuccess = createAction (
    '[Order elem] delete success',
    props<{ orderElem: OrderElem }>()
);
export const deleteOrderConfStart = createAction (
    '[OrderElemConf] delete start',
    props<{ orderElem: OrderElem}>()
);
// Order Element Hand
export const InsertOrderElemHandStart = createAction (
    '[OrderElemHand] start insert',
    props<{orderElem: OrderElem}>()
);
export const UpdateOderElemHandStart = createAction (
    '[OrderElementHand] start update',
    props<{orderElem: OrderElem}>()
);
export const DeleteOrderElemHanStart = createAction (
    '[OrderElemHand] delete start',
    props<{orderElem: OrderElem}>()
);
export const InsertOrderElemConfStart = createAction (
    '[orderElementConf insert] start',
    props<{ orderElem: OrderElem }>()
);
export const OrderElemConfLoadStart = createAction (
    '[OrderElemConfig m] start load',
    props<{orderElemConfId: string}>()
);
export const OrderElemConfLoadSuccess = createAction (
    '[OrderElemConf m] load success',
    props<{ product: Products[],
        orderSElemConf: OrderElem[],
        productConfElem: ProductConfElem[],
        productPrice: ProductPrice[],
        priceSpec: PriceSpec[]}>()
);
export const UpdateElementConfStart = createAction (
    '[OrderElemConf] update start',
    props<{orderElemConf: OrderElem}>()
);
export const UpdateElementConfSuccess = createAction (
    '[OrderElemConf] update success',
    props<{partialOrderElemConf: Update<OrderElem>}>()
);

export const InsertSElemConfStart = createAction (
    '[OrderSElementConf m] start insert',
    props<{orderSElemConf: OrderElem}>()
);
export const InsertSElemConfSuccess = createAction (
    '[OrderSelementConf m] Insert Success',
    props<{orderSElemConf: OrderElem,
    partialOrderElem: Update<OrderElem>}>()
);
export const DelereOrderSElemStart = createAction (
    '[OrderSElem] delete start',
    props<{orderSElemConf: OrderElem}>()
);
export const DeleteOrderSElemSuccess = createAction (
    '[OrderSElem] delete success',
    props<{orderSElemConf: OrderElem,
        partialOrderElem: Update<OrderElem>}>()
);
export const UpdateOrderSElemStart = createAction (
    '[OrderSElem] update start',
    props<{orderSElemConf: OrderElem}>()
);
export const UpdateOrderSElemSuccess = createAction (
    '[OrderSElem] update success',
    props<{orderSElemConf: OrderElem,
        partialOrderElem: Update<OrderElem>}>()
);


// order elem
