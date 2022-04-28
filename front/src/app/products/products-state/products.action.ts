import { createAction, props } from '@ngrx/store';
import { Category } from '../model/category';
import { Products } from '../model/products';
import { ProductsParams } from '../model/products-params';
import { ProductsResponce } from '../model/products-responce';
import { Update } from '@ngrx/entity';

export const loadAllCategory = createAction (
'[Product m] load all category'
);

export const loadAllCategorySukcess = createAction (
    '[Product m] load category sukcess',
    props<{category: Category[]}>()
);

export const insertCategoryStart = createAction (
    '[Product m] insert new category',
    props<{category: Category}>()
);

export const updateCategory = createAction (
    '[Product m] update category',
    props<{category: Category}>()
);

export const deleteCategory = createAction (
    '[Product m] delete category',
    props<{category: string}>()
);

// ==== products
// dodawanie produktu
export const insertProductStart = createAction (
    '[Products m] insert products',
    props<{product: Products}>()
);
export const insertProductSukcess = createAction (
    '[Products m] insert products sukcess',
    props<{product: Products}>()
);

export const ProductsLoadAction = createAction(
    '[Products] Loading',
    props<{product: ProductsParams}>()
);

export const ProductLoadSuccessAction = createAction(
    '[Products] Load Sukcess',
    props<{product: ProductsResponce}>()
);

export const ProductLoadFailAction = createAction(
    '[Products] Load Fail',
    props<{error: any}>()
);

export const ProductDeleteStartAction = createAction(
    '[Product] delete start',
    props<{product: Products}>()
);
export const ProductDeleteSukcess  = createAction(
    '[Product] delete sukcess',
    props<{product: Products}>()
);
export const ProductUpdateStart = createAction (
    '[Product] product update start',
    props<{product: Products}>()
);
export const ProductUpdateSukcess = createAction (
    '[Product] product update sukcess',
    props<{partialProduct: Update<Products>, product: Products}>()
);




