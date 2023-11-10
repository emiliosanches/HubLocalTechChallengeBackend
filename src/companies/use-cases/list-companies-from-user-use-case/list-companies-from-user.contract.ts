export interface ListCompanyReturnItem {
  id: number;
  name: string;
  placesAmount: number;
}

export interface ListCompaniesFromUserContract {
  execute(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<{
    page: number;
    perPage: number;
    total: number;
    data: ListCompanyReturnItem[];
  }>;
}

export const LIST_COMPANIES_USE_CASE = 'LIST_COMPANIES_USE_CASE';
