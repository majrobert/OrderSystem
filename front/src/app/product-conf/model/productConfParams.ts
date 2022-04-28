export interface ProductsConfParams {
    status: number;
    category: string;
    filter: string;
    sortDirection: 'asc' | 'desc'| '';
    sortField: string;
    pageIndex: number;
    pageSize: number;
}
