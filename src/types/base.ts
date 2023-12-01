export interface BasePaginatedRequestDto {
    page?: number;
    pageSize?: number;
}

export interface BasePaginatedItems<TItem> {
    items: TItem[];
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
}
  