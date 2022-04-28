import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OffersState } from './offers.reducers';
import * as fromOfers from './offers.reducers';
import { ProductsState } from 'src/app/products/products-state/products.reducers';

export const selectOfferState = createFeatureSelector<OffersState>('offers');
export const selectProductState = createFeatureSelector<ProductsState>('products');


export const getAllCurrency = createSelector(
    selectOfferState,
    state => state.currency
);
export const areCurrencyLoaded = createSelector(
    selectOfferState,
    state => state.allCurrencyLoaded
);
export const areOrderListLoad = createSelector(
    selectOfferState,
    state => state.allOrderLoaded
);
export const getAllOrders = createSelector(
    selectOfferState,
    state => state.orders
);
export const getTotalOrderList = createSelector(
    selectOfferState,
    state => state.total
);
export const getOffer = (id: string) => createSelector(
    selectOfferState,
    state => state.orders.filter(o => o.id === id)[0]
);

// get element list of oferr
export const getAllOrderElem = createSelector(
    selectOfferState,
    fromOfers.selectAll
);

export const areOrderElemLoad = createSelector(
    selectOfferState,
    state => state.allOrderElementLoaded
);
// get list of headers
export const getAllHeader = createSelector(
    selectOfferState,
    state => state.orderHeader
);
// get all header of order wit element for edit form
export const getAllHeaderOrderWitchElem = (orderId: string) => createSelector(
    getAllHeader,
    getAllOrderElem,
    (headers, element) => {
        return headers
            // .filter(h => h.orderId === orderId)
            .map((item) => ({
                ...item,
                orderElem: element.filter(e => e.orderHeaderId === item.id)
            })).filter(h => h.orderId === orderId);
    }
);

export const currentOderId = createSelector(
    selectOfferState,
    state => state.currentOferId
);
export const getSumOffert = (orderId: string) => createSelector(
    getAllOrderElem,
    state => {
        if (state.length > 0) {
            const element = state;
            const sumWart = element.map(c => c.price * c.quantity).reduce((p, n) => p + n);
            const sumDiscount = element.map(d => d.priceAfterDiscount).reduce((p, n) => p + n);
            const sumBrutto = element.map(b => b.priceBrutto).reduce((p, n) => p + n);
            const sumZakup = element.map(z => z.pricePurchase * z.quantity).reduce((p, n) => p + n);
            let sumUpust = 0;
            if (sumWart !== 0) {
                sumUpust = (Math.round(((sumWart - sumDiscount) / sumWart) * 10000)) / 100;
            }
            return { sumWart: sumWart, sumDiscount: sumDiscount, sumZakup: sumZakup, sumBrutto: sumBrutto, sumUpust: sumUpust };
        }
        return { sumWart: 0, sumDiscount: 0, sumZakup: 0, sumBrutto: 0, sumUpust: 0 };

        // .map( s => (s.price * s.quantity)).reduce(( p , n) => p + n);
    }
);
export const areOrerElemConLoad = createSelector(
    selectOfferState,
    state => state.allOrderElemConfLoaded
);
export const selectCurrentOferConfId = createSelector(
    selectOfferState,
    state => state.currentOferConfId
);
export const selectAllCategory = createSelector(
    selectProductState,
    state => state.category
);
export const selectAllProductElemConf = createSelector(
    selectOfferState,
    selectAllCategory,
    (state, kategory) => {
        const product = state.products;
        const productConfElem = state.productConfElem;
        const priceSpec = state.priceSpec;
        const orderSElemConf = state.orderSElemConf;
        return state.productPrice
         .map((item) => {
            const productItem = product.filter(x => x.id === item.productId)[0];
            if (productItem) {
                item = Object.assign({}, item, {
                    productCode: productItem.code,
                    productName: productItem.name,
                    productJm: productItem.jm,
                    productVat: productItem.vat,
                    productTyp: productItem.type,
                    categoryProd: productItem.categoryProdId
                });
            }
            const kat = kategory.filter(k => k.id === item.categoryProd)[0];
            if (kat) {
                item = Object.assign({}, item, { categoryProd: kat.name });
            }
            const productConfItem = productConfElem.filter(p => p.productId === item.productId)[0];
            if (productConfItem) {
                item = Object.assign({}, item, { quantity: productConfItem.quantity });
            }
            const priceSpecItem = priceSpec.filter(p => p.productId === item.productId)[0];
            if (priceSpecItem) {
                item = Object.assign({}, item, { priceSpec: priceSpecItem.cost });
            }
            const orderSElemConfItem = orderSElemConf.filter(p => p.productId === item.productId);
            if (orderSElemConfItem.length > 0) {
                item = Object.assign({}, item, { isOrderElem: true });
            } else {
                item = Object.assign({}, item, { isOrderElem: false });
            }
           return item;
         });
    }
);
export const selectAllOrderSElem = createSelector (
    selectOfferState,
    state => state.orderSElemConf
);
export const selectOrderElement =
(orderElemId: string) => createSelector (
    getAllOrderElem,
    state => state
    .filter(o => o.id === orderElemId)[0]
);
export const getSumOfferSElem = createSelector (
    selectOfferState,
     state => {
        if (state.orderSElemConf.length > 0) {
            const element = state.orderSElemConf;
            const sumWart = element.map(c => c.price * c.quantity)
            .reduce((p, n) => p + n);
            const sumDiscount = element.map(d => d.priceAfterDiscount)
            .reduce((p, n) => p + n);
            const sumBrutto = element.map(b => b.priceBrutto)
            .reduce((p, n) => p + n);
            const sumZakup = element.map(z => z.pricePurchase * z.quantity)
            .reduce((p, n) => p + n);
            let sumUpust = 0;
            if (sumWart !== 0) {
                sumUpust = (Math.round(((sumWart - sumDiscount) / sumWart) * 10000)) / 100;
            }
            return { sumWart: sumWart, sumDiscount: sumDiscount, sumZakup: sumZakup, sumBrutto: sumBrutto, sumUpust: sumUpust };
        }
        return { sumWart: 0, sumDiscount: 0, sumZakup: 0, sumBrutto: 0, sumUpust: 0 };
    }
);



