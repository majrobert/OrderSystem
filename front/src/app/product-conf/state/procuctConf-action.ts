import { props, createAction } from '@ngrx/store';
import { ProductConf } from '../model/productConf';
import { ProductsConfParams } from '../model/productConfParams';
import { ProductConfElem } from '../model/productConfElem';
import { Update } from '@ngrx/entity';

export const insertProductConfStart = createAction (
    '[ProductConf m] insert item start',
    props<{productConf: ProductConf}>()
);
export const insertProductConfSuccess = createAction (
    '[ProductConf m] insert item success',
    props<{productConf: ProductConf}>()
);
export const productConfLoadFail = createAction (
    '[productConf m] productConfLoadFail',
    props<{error: any}>()
);
export const ProductsConfigListLoadStart = createAction (
    '[ProductConf m] list start loading',
    props<{productConfParam: ProductsConfParams}>()
);
export const productConfListLoadSukcess = createAction (
    '[ProductConf m] list load succes',
    props<{total: number, productConf: ProductConf[],
        productConfElem: ProductConfElem[]}>()
);
export const productConfDeleteStart = createAction (
    '[Productconf m] productConf start delete ',
    props<{productConf: ProductConf}>()
);
export const procuctConfDeleteSuccess = createAction(
    '[Productconf m ] productconf delete success',
    props<{productConf: ProductConf}>()
);
export const productConfUpdateStart = createAction (
    '[ProductConf m] update start',
    props<{productConf: ProductConf}>()
);
export const productConfUpdateSuccess = createAction (
    '[ProductConf m] update sukcess',
    props<{partialProduct: Update<ProductConf>, productConf: ProductConf}>()
);
export const insertProductConfElemStart = createAction(
    '[ProductConfElem m] start insert',
    props<{productConfElem: ProductConfElem}>()
);
export const insertProductConfElemSuccess = createAction (
    '[ProductConElem] insert succes',
    props<{productConfElem: ProductConfElem}>()
);
export const deleteProductConfElemStart = createAction (
    '[productConfElem m] delete start',
    props<{productConfElem: ProductConfElem}>()
);
export const deleteProductConfElemSuccess = createAction (
    '[producConfElem] delete success',
    props<{productConfElem: ProductConfElem}>()
);
export const updateProductConfElemStart = createAction (
    '[productConfElem] update start',
    props<{productConfElem: ProductConfElem}>()
);

export const updateProductConfElemSukccess = createAction (
    '[productConfElem] update success',
    props<{productConfElem: ProductConfElem}>()
);
