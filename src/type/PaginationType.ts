
export interface Pagination{
    total_pages: number,
    current_page: number,
    has_pre: boolean,
    has_next: boolean,
    category: string
}
export interface PaginationCompoentType{
    getData: (page: number) => void;
    pageInfo:Pagination
  }