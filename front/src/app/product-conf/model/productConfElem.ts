export interface ProductConfElem {
    id?: string;
    quantity: number;
    sort: number;
    status: number;
    productConfId: string;
    productId: string;
    code?: string;
    name?: string;
    vat?: number;
    type?: number;
    categoryProd?:  string;
    description?: string;
    isOrderElem?: boolean;
}
