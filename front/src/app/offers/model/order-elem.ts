export interface OrderElem {
    id?: string;
    sort: number;
    lp: string;
    description: string;
    name: string;
    code: string;
    price: number;
    pricePurchase: number;
    priceAfterDiscount: number;
    priceBrutto: number;
    quantity: number;
    jm: string;
    currency: string;
    vat: number;
    type: number;
    orderId: string;
    orderHeaderId: string;
    productId?: string;
    productConfId?: string;
    status: number;
    typ?: string;
    orderElemConfId?: string;
}
