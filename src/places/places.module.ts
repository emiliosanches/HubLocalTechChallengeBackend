import { Module } from '@nestjs/common';
import { PlacesUseCasesModule } from './use-cases/places-use-cases.module';
import { PlacesAdapterModule } from './adapters/adapters.module';

@Module({
  imports: [PlacesUseCasesModule, PlacesAdapterModule],
})
export class PlacesModule {}
