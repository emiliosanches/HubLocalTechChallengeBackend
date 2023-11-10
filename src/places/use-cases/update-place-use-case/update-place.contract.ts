import { UpdatePlaceDto } from './update-place.dto';
import { Place } from 'src/places/domain/place.entity';

export interface UpdatePlaceContract {
  execute(id: number, companyId: number, data: UpdatePlaceDto): Promise<Place>;
}

export const UPDATE_PLACE_USE_CASE = 'UPDATE_PLACE_USE_CASE';
