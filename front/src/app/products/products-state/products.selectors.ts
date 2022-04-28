import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../products-state/products.reducers';

export const selectProductState = createFeatureSelector<ProductsState>('products');
export const selectPricelistState = createFeatureSelector<PricelistState>('pricelist');

import * as fromProducts from '../products-state/products.reducers';
import { PricelistState } from '../../price-list/reducers/pricelist.reducer';

// produkty


export const selectAllCategory = createSelector(
    selectProductState,
    state => state.category
);

export const areCategoriesLoaded = createSelector(
    selectProductState,
    state => state.allCategoryLoaded
);

export const getAllProducts = createSelector(
    selectProductState,
    fromProducts.selectAll
);

export const getAllProductsWitchCategory = createSelector(
    getAllProducts,
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

export const getTotalProducts = createSelector(
    selectProductState,
    product => product.total
);
export const areProductsLoaded = createSelector(
    selectProductState,
    product => product.productsLoad
);
export const getProduct = (id: string) => createSelector(
    getAllProducts,
    products => products.filter(p => p.id === id)[0]
);

export const getProductWithCategory = (id: string) => createSelector(
    getAllProductsWitchCategory,
       products => products.filter(x => x.id === id)[0]
);

