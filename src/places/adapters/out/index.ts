import { Provider } from '@nestjs/common';
import { PLACES_REPOSITORY } from 'src/places/use-cases/ports/places-repository';
import { TypeormPlacesRepository } from './typeorm/typeorm-places-repository';

export const ServicesOut: Provider[] = [
  { provide: PLACES_REPOSITORY, useClass: TypeormPlacesRepository },
];
