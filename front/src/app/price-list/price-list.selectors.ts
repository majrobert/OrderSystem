import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PricelistState } from './reducers/pricelist.reducer';
import { ProductPrice } from './model/productPrice';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { ProductsState } from '../products/products-state/products.reducers';


export const selectPricelistState = createFeatureSelector<PricelistState>('pricelist');
export const selectProductState = createFeatureSelector<ProductsState>('products');

export const selectAllProductListType = createSelector(
    selectPricelistState,
    state => state.priceType
);

export const arePricelistTypeLoaded = createSelector(
    selectPricelistState,
    state => state.allPricelistTypeLoaded
);

export const getTotalProductPrice = createSelector(
    selectPricelistState,
    state => state.total
)
export const areProductPriceLoaded = createSelector(
    selectPricelistState,
    state => state.allProductPriceLoaded
);

export const selectAllCategory = createSelector(
    selectProductState,
    state => state.category
);
export const selectAllProductPrice = createSelector(
    selectPricelistState,
    selectAllCategory,
    (state, kategory) => {
        const product = state.products;
        const priceType = state.priceType;
        return state.productPrice.map((item) => {
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
            const priceTypeItem = priceType.filter(x => x.id === item.priceId)[0];
            if (priceTypeItem) {
                item = Object.assign({}, item, { priceName: priceTypeItem.name });
            }
            const kat = kategory.filter(k => k.id === item.categoryProd)[0];
            if (kat) {
                item = Object.assign({}, item, { categoryProd: kat.name });
            }
            return item;
        }

        );
    }
);

export const selectAllProductPriceOffer = createSelector(
    selectPricelistState,
    selectAllCategory,
    (state, kategory) => {
        const product = state.products;
        if (state.allProductPriceLoaded) {
        return state.productPrice.map((item) => {
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
            const customerPrice = state.productSpecialPrice.filter(c => c.productId === item.productId)[0];
            if (customerPrice) {
                item = Object.assign({}, item, { priceSpec: customerPrice.cost });
            }

            return item;
        }

        );}
    }
);
// cart product
export const getPriceTypeWithProductPriceForProduct = (productId: string) => createSelector(
    selectPricelistState,
    state => {
        const productPrice = state.productPrice;
        return state.priceType.map((item) => {
            if (state.allProductPricesLoaded === true && state.productPrice !== undefined && state.productPrice !== []) {
                const cost = productPrice.filter(x => x.priceId === item.id && x.productId === productId)[0];
                if (cost) {
                    item = Object.assign({}, item, {
                        cost: cost.cost
                    });
                }
            }
            return item;
        });
    }
);
// card product
export const getProductSpecialPriceForCustomer = (productId: string) => createSelector(
    selectPricelistState,
    state => {
        if (state.allProductPricesLoaded === true) {
            return state.customersPrice.map((item) => {
                const poz = state.productSpecialPrice.filter(x => x.customerId === item.id && x.productId === productId)[0];
                if (poz) {
                    item = Object.assign({}, item, {
                        cost: poz.cost
                    });
                }
                return item;
            });
        }
    }
);
// add order element to offer
export const getProductForOffer = (productId: string) => createSelector (
    selectPricelistState,
    state => state.products.filter(p => p.id === productId)[0]
);
