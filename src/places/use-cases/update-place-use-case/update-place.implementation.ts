import { UpdatePlaceContract } from './update-place.contract';
import { UpdatePlaceDto } from './update-place.dto';
import {
  PLACES_REPOSITORY,
  PlacesRepository,
} from '../ports/places-repository';
import { Inject } from '@nestjs/common';
import { PlaceNotFoundException } from '../exceptions/PlaceNotFoundException';

export class UpdatePlaceUseCase implements UpdatePlaceContract {
  constructor(
    @Inject(PLACES_REPOSITORY)
    private readonly placesRepository: PlacesRepository,
  ) {}

  async execute(id: number, companyId: number, data: UpdatePlaceDto) {
    const place = await this.placesRepository.findByCompanyIdAndId(
      companyId,
      id,
    );

    if (!place) throw new PlaceNotFoundException();

    this.placesRepository.merge(place, data);

    await this.placesRepository.save(place);

    return place;
  }
}
