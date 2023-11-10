import { Place } from 'src/places/domain/place.entity';

export interface GetPlaceByIdContract {
  execute(companyId: number, id: number): Promise<Place>;
}

export const GET_PLACE_BY_ID_USE_CASE = 'GET_PLACE_BY_ID_USE_CASE';
