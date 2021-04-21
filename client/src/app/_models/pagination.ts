export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PagiantedResult<T> {
    result: T;
    pagination: Pagination;
}