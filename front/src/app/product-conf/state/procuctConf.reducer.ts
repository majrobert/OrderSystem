import { ProductConf } from '../model/productConf';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ProductConfElem } from '../model/productConfElem';
import { createReducer, on } from '@ngrx/store';
import { ProductConfActions } from './action-types';
import { isNgTemplate } from '@angular/compiler';



export interface ProductConfState extends EntityState<ProductConf> {
    productConfElem: ProductConfElem[];
    productConfLoaded: boolean;
    error: boolean;
    errorMasage: string;
    total: number;
}
export const adapter = createEntityAdapter<ProductConf>(
);

export const initialProductConfState = adapter.getInitialState({
    productConfElem: undefined,
    productConfLoaded: false,
    error: false,
    errorMasage: undefined,
    total: 0
});

const _productConfReducer = createReducer(
    initialProductConfState,
    on(ProductConfActions.insertProductConfSuccess, (state, action) => (
        adapter.addOne(action.productConf, {
            ...state
    }))),
    on(ProductConfActions.productConfLoadFail, (state, action) => ({
        ...state, error: true, total: 0, errorMasage: action.type
    })),
    on(ProductConfActions.ProductsConfigListLoadStart, (state, action) => ({
        ...state, productConfLoaded: false
    })),
    on(ProductConfActions.productConfListLoadSukcess, (state, action) => (
        adapter.addAll(action.productConf, {
            ...state, productConfLoaded: true,
            productConfElem: action.productConfElem,
            total: action.total
        })
    )),
    on(ProductConfActions.procuctConfDeleteSuccess, (state, action) => (
        adapter.removeOne(action.productConf.id, { ...state})
    )),
    on(ProductConfActions.productConfUpdateSuccess, (state, action) => (
        adapter.updateOne(action.partialProduct, {
            ...state
        })
    )),
    on(ProductConfActions.insertProductConfElemSuccess, (state, action) => ({
        ...state,
        productConfElem: [...state.productConfElem, action.productConfElem]
    })),
    on(ProductConfActions.deleteProductConfElemSuccess, (state, {productConfElem}) => (
        {
        ...state,
        productConfElem: [...state.productConfElem.filter( x => x.id !== productConfElem.id )]
        })),
    on(ProductConfActions.updateProductConfElemSukccess, (state, {productConfElem}) => {
        const product = state.productConfElem.map(
            item => item.id === productConfElem.id ? productConfElem : item
        );
        return {
            ...state,
            productConfElem: [...product]
        };
    })
);

export function productConfReducer( state, action ){
    return _productConfReducer(state, action);
  }
export const { selectAll} = adapter.getSelectors();
