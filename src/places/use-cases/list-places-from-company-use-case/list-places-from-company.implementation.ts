import { ListPlacesFromCompanyContract } from './list-places-from-company.contract';
import { Inject } from '@nestjs/common';
import {
  PLACES_REPOSITORY,
  PlacesRepository,
} from '../ports/places-repository';

export class ListPlacesFromCompanyUseCase implements ListPlacesFromCompanyContract {
  constructor(
    @Inject(PLACES_REPOSITORY)
    private readonly placesRepository: PlacesRepository,
  ) {}

  async execute(companyId: number, page: number, perPage: number) {
    const { data, total } = await this.placesRepository.findPaginatedByCompanyId(companyId, page, perPage);

    return {
      page: page,
      perPage: perPage,
      total,
      data,
    };
  }
}
