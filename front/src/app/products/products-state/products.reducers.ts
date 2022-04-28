import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Products } from '../model/products';
import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from './action-types';
import { Category } from '../model/category';


export interface ProductsState extends EntityState<Products> {
    category: Category[];
    allCategoryLoaded: boolean;
    productsLoad: boolean;
    error: boolean;
    errorMesage: string;
    total: number;
}
export const adapter = createEntityAdapter<Products>(
);
export const initialProductsState = adapter.getInitialState({
    allCategoryLoaded: false,
    category: undefined,
    productsLoad: false,
    errorMesage: undefined,
    error: false,
    total: 0,
});
const _productsReducer = createReducer(
    initialProductsState,
    on(ProductsActions.loadAllCategorySukcess,
        (state, action) => (
            {
                ...state,
                category: action.category,
                allCategoryLoaded: true
            })
    ),
    on(ProductsActions.insertProductSukcess, (state, action) => (
        adapter.addOne(action.product, {
            ...state
        })
    )),
    on(ProductsActions.ProductsLoadAction, (state, action) => (
       {...state, error: false, productsLoad: true}
    )),
    on(ProductsActions.ProductsLoadAction, (state, action) => ({
        ...state, productsLoad: false
    })),
    on(ProductsActions.ProductLoadSuccessAction, (state, action) => (
        adapter.addAll(action.product.products, {
            ...state,
            error: false,
            productsLoad: true,
            total: action.product.total
        })
    )),
    on(ProductsActions.ProductLoadFailAction, (state, action) => (
        adapter.removeAll({
            ...state, error: true, productsLoad: false, total: 0,
            errorMesage: action.error
        })
    )),
    on(ProductsActions.ProductDeleteSukcess, (state, action) => (
        adapter.removeOne(action.product.id, {
            ...state
        })
    )),
    on(ProductsActions.ProductUpdateSukcess, (state, action) => (
        adapter.updateOne(action.partialProduct, {
            ...state
        })
    ))
);

export function productsReducer ( state, action ){
    return _productsReducer(state, action);
  }


export const { selectAll} = adapter.getSelectors();
