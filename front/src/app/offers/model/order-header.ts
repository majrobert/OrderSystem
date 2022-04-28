import { OrderElem } from './order-elem';

export interface OrderHeader {
    id?: string;
    sort: number;
    name: string;
    pricePurchase?: number;
    priceAfterDiscount?: number;
    priceBrutto?: number;
    orderId: string;
    orderElem?: OrderElem[];
    collapse?: true;
}
