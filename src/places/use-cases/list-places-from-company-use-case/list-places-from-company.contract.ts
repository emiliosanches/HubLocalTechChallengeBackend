import { Place } from 'src/places/domain/place.entity';

export interface ListPlacesFromCompanyContract {
  execute(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<{
    page: number;
    perPage: number;
    total: number;
    data: Place[];
  }>;
}

export const LIST_PLACES_BY_COMPANY_USE_CASE = 'LIST_PLACES_BY_COMPANY_USE_CASE';
