export interface ProductPriceParams {
    category: string;
    filter: string;
    sortDirection: 'asc' | 'desc'| '';
    sortField: string;
    pageIndex: number;
    pageSize: number;
    priceType: string;
    orderId?: string;
    custonerId?: string;
}
