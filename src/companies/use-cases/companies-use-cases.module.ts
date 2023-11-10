import { Module, forwardRef } from '@nestjs/common';
import { Services } from '.';
import { CompaniesAdapterModule } from '../adapters/adapters.module';

@Module({
  imports: [forwardRef(() => CompaniesAdapterModule)],
  providers: [...Services],
  exports: [...Services],
})
export class CompaniesUseCasesModule {}
