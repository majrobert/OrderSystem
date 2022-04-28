export interface OrdersParams {
    status: number;
    dateStart: Date;
    series: string;
    currencyId: string;
    filter: string;
    dateEnd: Date;
    sortDirection: 'asc' | 'desc' | '';
    sortField: string;
    pageIndex: number;
    pageSize: number;
}
