import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductConfState } from './procuctConf.reducer';

import * as fromProductConf from './procuctConf.reducer';
import { ProductsState } from 'src/app/products/products-state/products.reducers';
export const selectProductState = createFeatureSelector<ProductsState>('products');
export const selectProductConfState = createFeatureSelector<ProductConfState>
('productconf');

export const selectAllCategory = createSelector(
    selectProductState,
    state => state.category
);

export const areProductConfLoaded = createSelector(
    selectProductConfState,
    state => state.productConfLoaded
);
export const getTotalProductConf = createSelector(
    selectProductConfState,
    state => state.total
);

export const GetAllProductConfList = createSelector(
    selectProductConfState,
    fromProductConf.selectAll
);

export const getAllProductsConfWitchCategory = createSelector(
    GetAllProductConfList,
    selectAllCategory,
    (product, category ) => {
        return product
        .map( (item) => ({
            ...item,
            categoryProd: category.filter(x => x.id === item.categoryProdId)[0].name
    })
    );
}
);

export const getProductConfWithCategory = (id: string) => createSelector(
    getAllProductsConfWitchCategory,
    products => products.filter(x => x.id === id)[0]
);

export const getProductConfElem = (id: string) => createSelector(
    selectProductConfState,
    product => product.productConfElem.filter( p => p.productConfId === id)
);
