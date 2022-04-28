import { Products } from 'src/app/products/model/products';
import { PriceType } from './PriceType';

export interface ProductPrice {
    productName?: string;
    productCode?: string;
    productVat?: number;
    productJm?: string;
    productTyp?: number;
    categoryProd?: string;
    productId: string;
    priceId: string;
    cost: number;
    priceName?: string;
    priceSpec?: number;
    quantity?: number;
}
