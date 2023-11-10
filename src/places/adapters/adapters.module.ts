import { Module, forwardRef } from '@nestjs/common';
import { ServicesOut } from './out';
import { PlacesUseCasesModule } from '../use-cases/places-use-cases.module';
import { PlacesController } from './in/rest/places-controller';
import { CompaniesAdapterModule } from 'src/companies/adapters/adapters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceTypeorm } from './out/typeorm/typeorm-place-entity';

@Module({
  imports: [
    forwardRef(() => PlacesUseCasesModule),
    forwardRef(() => CompaniesAdapterModule),
    TypeOrmModule.forFeature([PlaceTypeorm]),
  ],
  controllers: [PlacesController],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
})
export class PlacesAdapterModule {}
