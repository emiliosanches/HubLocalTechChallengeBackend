import { Provider } from '@nestjs/common';
import { COMPANY_REPOSITORY } from 'src/companies/use-cases/ports/company-repository';
import { TypeormCompaniesRepository } from './typeorm/typeorm-companies-repository';

export const ServicesOut: Provider[] = [
  { provide: COMPANY_REPOSITORY, useClass: TypeormCompaniesRepository },
];
