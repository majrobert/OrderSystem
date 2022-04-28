import { ProductPrice } from '../model/productPrice';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { PricelistActions } from '../action-type';
import { PriceType } from '../model/PriceType';
import { createReducer, on } from '@ngrx/store';
import { Products } from 'src/app/products/model/products';
import { Customers } from 'src/app/customers/model/customers';
import { PriceSpec } from '../model/priceSpec';

export interface PricelistState {
    priceType: PriceType[];
    products: Products[];
    productPrice: ProductPrice[];
    productSpecialPrice: PriceSpec[];
    customersPrice: Customers[];
    allPricelistTypeLoaded: boolean;
    allProductPriceLoaded: boolean;
    allProductPricesLoaded: boolean;
    error: boolean;
    errorMessage: string;
    total: number;
}



export const initialPricelistState = {
    priceType: undefined,
    products: undefined,
    productPrice: undefined,
    productSpecialPrice: [],
    allProductPriceLoaded: undefined,
    customersPrice: undefined,
    allPricelistTypeLoaded: false,
    allPricelistTypesLoaded: false,
    error: false,
    errorMessage: '',
    total: 0
};

 const _pricelistReducer = createReducer(
    initialPricelistState,
    on(PricelistActions.loadAppPriceListTypeSukcess,
        (state, action) => ({
            ...state,
            priceType: action.price,
            allPricelistTypeLoaded: true,
            error: false
        })),
    on(PricelistActions.pricelistLoadFailAction,
        (state, action) => ({
            ...state, error: true, total: 0,
            errorMessage: action.error
        })),
    on(PricelistActions.ProductPriceLoadAction,
        (state, action) => ({
            ...state, allProductPriceLoaded: false
        })),
    on(PricelistActions.ProductPriceLoadSuccess,
        (state, action) => ({
            ...state, allProductPriceLoaded: true,
            priceType: action.productPriceResponce.priceType,
            products: action.productPriceResponce.products,
            productPrice: action.productPriceResponce.productsPrice,
            total: action.productPriceResponce.total
        })),
    on(PricelistActions.ProductPricesLoad, (state, action) => ({
        ...state, allProductsPricesLoaded: false, productPrice: undefined
    })),
    on(PricelistActions.ProdudcsPriceLoadSuccess, (state, action) => ({
        ...state, allProductPricesLoaded: true,
        productPrice: action.productPrice,
        customersPrice: action.customer,
        productSpecialPrice: action.priceSpec
    })),
    on(PricelistActions.AddProductPriceToProductStart, (state, action) => ({
        ...state, allProductsPricesLoaded: false, allProductPriceLoaded: false, productPrice: undefined
    })),
    on(PricelistActions.UpdateProductPriceToProduct, (state, action) => ({
        ...state, allProductsPricesLoaded: false, allProductPriceLoaded: false, productPrice: undefined
    })),
    on(PricelistActions.AddUpdateProductPriceToProductSucess, (state, action) => ({
        ...state, allProductPricesLoaded: true,
        productPrice: action.productPrice,
    })),
    on(PricelistActions.ProductPriceOrderCustomerLoad, (state, action) => ({
        ...state,  allProductPriceLoaded: false
    })),
    on(PricelistActions.ProductPriceOrderCustomerSucces, (state, action) => ({
        ...state,  allProductPriceLoaded: true, productPrice: action.productsPrice,
        products: action.products, productSpecialPrice: action.priceSpecs, total: action.total
    }))
);

export function pricelistReducer ( state, action ){
    return _pricelistReducer(state, action);
  }
