import { CreatePlaceContract } from './create-place.contract';
import { CreatePlaceDto } from './create-place.dto';
import {
  PLACES_REPOSITORY,
  PlacesRepository,
} from '../ports/places-repository';
import { Inject } from '@nestjs/common';
import { Place } from 'src/places/domain/place.entity';
import { COMPANY_REPOSITORY, CompanyRepository } from 'src/companies/use-cases/ports/company-repository';
import { CompanyNotFoundException } from 'src/companies/use-cases/exceptions/CompanyNotFoundException';

export class CreatePlaceUseCase implements CreatePlaceContract {
  constructor(
    @Inject(PLACES_REPOSITORY)
    private readonly placesRepository: PlacesRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(data: CreatePlaceDto) {
    const company = await this.companyRepository.findById(data.companyId);

    if (!company) throw new CompanyNotFoundException();

    let place = new Place();
    place.name = data.name;
    place.zipcode = data.zipcode;
    place.street = data.street;
    place.number = data.number;
    place.neighborhood = data.neighborhood;
    place.city = data.city;
    place.state = data.state;
    place.companyId = data.companyId;

    place = await this.placesRepository.save(place);

    return place;
  }
}
