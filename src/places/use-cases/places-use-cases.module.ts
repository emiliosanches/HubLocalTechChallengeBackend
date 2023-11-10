import { Module, forwardRef } from '@nestjs/common';
import { Services } from '.';
import { PlacesAdapterModule } from '../adapters/adapters.module';
import { CompaniesAdapterModule } from 'src/companies/adapters/adapters.module';

@Module({
  imports: [
    forwardRef(() => PlacesAdapterModule),
    forwardRef(() => CompaniesAdapterModule),
  ],
  providers: [...Services],
  exports: [...Services],
})
export class PlacesUseCasesModule {}
