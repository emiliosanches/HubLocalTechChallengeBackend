import { Provider } from '@nestjs/common';
import { CREATE_PLACE_USE_CASE } from './create-place-use-case/create-place.contract';
import { CreatePlaceUseCase } from './create-place-use-case/create-place.implementation';
import { LIST_PLACES_BY_COMPANY_USE_CASE } from './list-places-from-company-use-case/list-places-from-company.contract';
import { ListPlacesFromCompanyUseCase } from './list-places-from-company-use-case/list-places-from-company.implementation';
import { GET_PLACE_BY_ID_USE_CASE } from './get-place-by-id-use-case/get-place-by-id.contract';
import { GetPlaceByIdUseCase } from './get-place-by-id-use-case/get-place-by-id.implementation';
import { UPDATE_PLACE_USE_CASE } from './update-place-use-case/update-place.contract';
import { UpdatePlaceUseCase } from './update-place-use-case/update-place.implementation';
import { RemovePlaceUseCase } from './remove-place-use-case/remove-place.implementation';
import { REMOVE_PLACE_USE_CASE } from './remove-place-use-case/remove-place.contract';

export const Services: Provider[] = [
  { provide: CREATE_PLACE_USE_CASE, useClass: CreatePlaceUseCase },
  {
    provide: LIST_PLACES_BY_COMPANY_USE_CASE,
    useClass: ListPlacesFromCompanyUseCase,
  },
  { provide: GET_PLACE_BY_ID_USE_CASE, useClass: GetPlaceByIdUseCase },
  { provide: UPDATE_PLACE_USE_CASE, useClass: UpdatePlaceUseCase },
  { provide: REMOVE_PLACE_USE_CASE, useClass: RemovePlaceUseCase },
];
