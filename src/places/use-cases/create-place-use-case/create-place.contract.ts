import { CreatePlaceDto } from './create-place.dto';
import { Place } from 'src/places/domain/place.entity';

export interface CreatePlaceContract {
  execute(place: CreatePlaceDto): Promise<Place>;
}

export const CREATE_PLACE_USE_CASE = 'CREATE_PLACE_USE_CASE';
