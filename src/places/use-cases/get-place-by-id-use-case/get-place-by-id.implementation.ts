import { GetPlaceByIdContract } from './get-place-by-id.contract';
import {
  PLACES_REPOSITORY,
  PlacesRepository,
} from '../ports/places-repository';
import { Inject } from '@nestjs/common';
import { PlaceNotFoundException } from '../exceptions/PlaceNotFoundException';

export class GetPlaceByIdUseCase implements GetPlaceByIdContract {
  constructor(
    @Inject(PLACES_REPOSITORY)
    private readonly placesRepository: PlacesRepository,
  ) {}

  async execute(companyId: number, id: number) {
    const place = await this.placesRepository.findByCompanyIdAndId(
      companyId,
      id,
    );

    if (!place) throw new PlaceNotFoundException();

    return place;
  }
}
