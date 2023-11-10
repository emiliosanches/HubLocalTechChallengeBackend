import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesOut } from './out';
import { CompanyTypeorm } from './out/typeorm/typeorm-company-entity';
import { CompaniesUseCasesModule } from '../use-cases/companies-use-cases.module';
import { CompaniesController } from './in/rest/companies-controller';

@Module({
  imports: [
    forwardRef(() => CompaniesUseCasesModule),
    TypeOrmModule.forFeature([CompanyTypeorm]),
  ],
  controllers: [CompaniesController],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
})
export class CompaniesAdapterModule {}
