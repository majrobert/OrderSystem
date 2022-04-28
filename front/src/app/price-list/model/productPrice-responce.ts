import { Products } from 'src/app/products/model/products';
import { ProductPrice } from './productPrice';
import { PriceType } from './PriceType';

export interface ProductPriceResponce {
    total: number;
    products: Products[];
    productsPrice: ProductPrice[];
    priceType: PriceType[];
}
