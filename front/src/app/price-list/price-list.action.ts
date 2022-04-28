import { createAction, props } from '@ngrx/store';
import { PriceType } from './model/PriceType';
import { ProductPriceParams } from './model/productPrice-params';
import { ProductPriceResponce } from './model/productPrice-responce';
import { ProductPrice } from './model/productPrice';
import { PriceSpec } from './model/priceSpec';
import { Customers } from '../customers/model/customers';
import { Products } from '../products/model/products';

export const loadAllPriceListType = createAction (
    '[PriceList ] load types'
);
export const loadAppPriceListTypeSukcess = createAction (
    '[PriceList ] load type success',
    props<{price: PriceType[]}>()
);
export const updatePriceListType = createAction (
    '[Pricelist] start update',
    props<{price: PriceType}>()
);
export const pricelistLoadFailAction = createAction (
    '[Price list] fail list',
    props<{error: any}>()
);

// ========= product price

export const ProductPriceLoadAction = createAction (
    '[ProductPrice ] loading',
    props<{producPriceParams: ProductPriceParams}>()
);
export const ProductPriceLoadSuccess = createAction (
    '[Product Price] load Success',
    props<{productPriceResponce: ProductPriceResponce}>()
);
export const ProductPriceOrderCustomerLoad = createAction (
    '[Product price offer] start load',
    props<{producPriceParams: ProductPriceParams}>()
);
export const ProductPriceOrderCustomerSucces = createAction (
    '[Product price offer] start load success',
    props<{total: number, productsPrice: ProductPrice[],
        products: Products[] , priceSpecs: PriceSpec[]}>()
);
// add priceType to product
export const AddProductPriceToProductStart = createAction (
    '[Product Price] add productPrice do product',
    props<{product: Products, priceType: PriceType}>()
);
export const UpdateProductPriceToProduct = createAction (
    '[Product Price] update productPrice to product ',
    props<{product: Products, priceType: PriceType}>()
);
export const AddUpdateProductPriceToProductSucess = createAction (
    '[Product price] add-update product price sukcess',
    props<{productPrice: ProductPrice[]}>()
);
// pricegroup pricespec customerReleted
export const ProductPricesLoad = createAction (
    '[Product Prices] loading prices',
    props<{productId: string}>()
);
export const ProdudcsPriceLoadSuccess = createAction (
    '[Product Prices] loading prices sukccess',
    props<{ productPrice: ProductPrice[], priceSpec: PriceSpec[],
        customer: Customers[]}>()
);





