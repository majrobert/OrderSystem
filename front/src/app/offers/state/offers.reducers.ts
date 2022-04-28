import { Currency } from '../model/currency';
import { createReducer, on } from '@ngrx/store';
import { OffersAction } from './action-types';
import { Order } from '../model/order';
import { Action } from 'rxjs/internal/scheduler/Action';
import { OrderHeader } from '../model/order-header';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { OrderElem } from '../model/order-elem';
import { Products } from 'src/app/products/model/products';
import { ProductConf } from 'src/app/product-conf/model/productConf';
import { ProductPrice } from 'src/app/price-list/model/productPrice';
import { PriceSpec } from 'src/app/price-list/model/priceSpec';
import { ProductConfElem } from 'src/app/product-conf/model/productConfElem';


export interface OffersState extends EntityState<OrderElem> {
    currency: Currency[];
    allCurrencyLoaded: boolean;
    orders: Order[];
    allOrderLoaded: boolean;
    orderHeader: OrderHeader[];
    products: Products[];
    orderSElemConf: OrderElem[];
    productConfElem: ProductConfElem[];
    productPrice: ProductPrice[];
    priceSpec: PriceSpec[];
    allOrderHeaderLoaded: boolean;
    total: number;
    allOrderElementLoaded: boolean;
    allOrderElemConfLoaded: boolean;
  //  currentOrderEditId: string;
    currentOferId: string;
    currentOferConfId: string;

}
export const adapter = createEntityAdapter<OrderElem>(
);
export const initialOffersState: OffersState = adapter.getInitialState({
    currency: [],
    allCurrencyLoaded: false,
    orders: [],
    allOrderLoaded: false,
    orderHeader: [],
    products: [],
    orderSElemConf: [],
    productConfElem: [],
    productPrice: [],
    priceSpec: [],
    allOrderHeaderLoaded: false,
    allOrderElementLoaded: false,
    allOrderElemConfLoaded: false,
    currentOferId: '',
    currentOferConfId: '',
   // currentOrderEditId: '',
    total: 0
});

const _offersReducer = createReducer(
    initialOffersState,
    on(OffersAction.loadAllCurrencyStart, (state, action) => ({
        ...state, allCurrencyLoaded: false
    })),
    on(OffersAction.loadAllCurrencySuccess, (state, { currency }) => ({
        ...state, currency: [...currency], allCurrencyLoaded: true
    })),
    on(OffersAction.inserCurrencySuccess, (state, action) => ({
        ...state, currency: [...state.currency, action.currency]
    })),
    on(OffersAction.updateCurrencySuccess, (state, { currency }) => {
        const currencyT = state.currency.map(
            item => item.id === currency.id ? currency : item
        );
        return { ...state, currency: [...currencyT] };
    }),
    on(OffersAction.insertOrderStart, (state, action) => ({
        ...state, allOrderLoaded: false
    })),
    on(OffersAction.InsertOrderSukcess, (state, action) => ({
        ...state
        // load ofer o resolver of edit document
        // , orders: [...state.orders, action.order],
       // currentOferId: action.order.id
    })),
    on(OffersAction.LoadOrderSuccessResolver, (state, action) => ({
        ...state,
        orders: [action.order],
        allOrderLoaded: false
    })),
    on(OffersAction.OrderListLoadStart, (state, action) => ({
        ...state, allOrderLoaded: false
    })),
    on(OffersAction.OrderListLoadSuccess, (state, action) => ({
        ...state, orders: action.orders, total: action.total,
        allOrderLoaded: true
    })),
    on(OffersAction.OrderDeleteSuccess, (state, action) => ({
        ...state, orders: [...state.orders.filter(x => x.id !== action.order.id)]
    })),
    on(OffersAction.insertOrderHeaderSuccess, (state, action) => ({
        ...state, orderHeader: [...state.orderHeader, action.orderHeader]
    })),
    on(OffersAction.UpdateOrderHeaderSukcess, (state, action) => {
        const orderToUpdate = state.orderHeader.map(
            item => item.id === action.orderHeader.id ? action.orderHeader : item
        );
        return { ...state, orderHeader: [...orderToUpdate] };
    }),
    on(OffersAction.OrderloadElemStart, (state, action) => (
        adapter.removeAll({
            ...state, allOrderElementLoaded: false, currentOferId: action.orderId
        })
    )),
    on(OffersAction.OrderloadElemHeaderSuccess, (state, action) => ({
        ...state, orderHeader: [...action.orderHeader]
    })),
    on(OffersAction.OrderloadElemSuccess, (state, action) => (
        adapter.addMany(action.orderElem, {
            ...state,
            allOrderElementLoaded: true,
        }))),
    on(OffersAction.DeleteHeaderFoOrderSukcess, (state, action) => ({
        ...state, orderHeader: [...state.orderHeader
            .filter(x => x.id !== action.orderHeader.id)]
    })),
    on(OffersAction.UpdateDiscountSucces, (state, action) => (
        adapter.updateMany(action.partial, {
            ...state, allOrderLoaded: false, 
            allOrderElementLoaded: false, currentOferId: ''
        })
    )),
    on(OffersAction.insertOrderElemStart, (state, action) => ({
        ...state, allOrderElementLoaded: false
    })),
    on(OffersAction.insertOrderElemSuccess, (state, action) => (
        adapter.addOne(action.orderElem, {
            ...state, allOrderElementLoaded: false, 
            allOrderLoaded: false, currentOferId: ''
        })
    )),
    on(OffersAction.deleteOrderElemSuccess, (state, action) => (
        adapter.removeOne(action.orderElem.id, {
            ...state, allOrderElementLoaded: false,
            allOrderLoaded: false, currentOferId: ''
        })
    )),
    on(OffersAction.updateOrderElemSuccess, (state, action) => (
        adapter.updateOne(action.partialOrderElem, {
            ...state, allOrderElementLoaded: false, 
            allOrderLoaded: false, currentOferId: ''
        })
    )),
    on(OffersAction.OrderElemConfLoadStart, (state, action) => ({
        ...state, allOrderElemConfLoaded: false,
        currentOferConfId: action.orderElemConfId
    })),
    on(OffersAction.OrderElemConfLoadSuccess, (state, action) => ({
        ...state, products: [...action.product],
        orderSElemConf: [...action.orderSElemConf],
        productConfElem: [...action.productConfElem],
        productPrice: [...action.productPrice],
        priceSpec: [...action.priceSpec],
        allOrderElemConfLoaded: true
    })),
    on(OffersAction.InsertSElemConfSuccess, (state, action) => (
        adapter.updateOne(action.partialOrderElem, {
            ...state, orderSElemConf: [...state.orderSElemConf, action.orderSElemConf],
            allOrderLoaded: false, allOrderElementLoaded: false, currentOferId: ''
        }))),
    on(OffersAction.DeleteOrderSElemSuccess, (state, action) => (
        adapter.updateOne(action.partialOrderElem, {
            ...state, orderSElemConf: [...state.orderSElemConf
                .filter(o => o.id !== action.orderSElemConf.id)],
                 allOrderLoaded: false, allOrderElementLoaded: false, currentOferId: ''
        }))),
    on(OffersAction.UpdateOrderSElemSuccess, (state, action) => (
        adapter.updateOne(action.partialOrderElem, {
            ...state, orderSElemConf: [...state.orderSElemConf.map(item =>
                item.id === action.orderSElemConf.id ? action.orderSElemConf : item)],
         allOrderLoaded: false, allOrderElementLoaded: false, currentOferId: ''
        })
    )),
    on(OffersAction.UpdateElementConfSuccess , (state, action) => (
        adapter.updateOne(action.partialOrderElemConf, {
            ...state
        })
    ))
);

export function offersReducer ( state, action ){
    return _offersReducer(state, action);
  }

export const { selectAll } = adapter.getSelectors();

