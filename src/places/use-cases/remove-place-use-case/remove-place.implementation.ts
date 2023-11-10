import { RemovePlaceContract } from './remove-place.contract';
import {
  PLACES_REPOSITORY,
  PlacesRepository,
} from '../ports/places-repository';
import { Inject } from '@nestjs/common';
import { PlaceNotFoundException } from '../exceptions/PlaceNotFoundException';

export class RemovePlaceUseCase implements RemovePlaceContract {
  constructor(
    @Inject(PLACES_REPOSITORY)
    private readonly placesRepository: PlacesRepository,
  ) {}

  async execute(companyId: number, id: number) {
    const existingPlace = await this.placesRepository.findByCompanyIdAndId(companyId, id);

    if (!existingPlace) throw new PlaceNotFoundException();

    await this.placesRepository.removeById(id);
  }
}
