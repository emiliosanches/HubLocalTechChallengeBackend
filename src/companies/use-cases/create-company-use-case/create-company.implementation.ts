import { Company } from 'src/companies/domain/company.entity';
import { CompanyExistsException } from '../exceptions/CompanyExistsException';
import { CreateCompanyContract } from './create-company.contract';
import { CreateCompanyDto } from './create-company.dto';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '../ports/company-repository';
import { Inject } from '@nestjs/common';

export class CreateCompanyUseCase implements CreateCompanyContract {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companiesRepository: CompanyRepository,
  ) {}

  async execute(data: CreateCompanyDto) {
    data.cnpj = data.cnpj.replace(/\D/g, '');

    const companyExists = await this.companiesRepository.exists(data.cnpj);

    if (companyExists) {
      throw new CompanyExistsException();
    }

    let company = new Company();
    company.name = data.name;
    company.cnpj = data.cnpj;
    company.website = data.website;
    company.userId = data.userId;

    company = await this.companiesRepository.save(company);

    return company;
  }
}
