import { UpdateCompanyContract } from './update-company.contract';
import { UpdateCompanyDto } from './update-company.dto';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '../ports/company-repository';
import { Inject } from '@nestjs/common';
import { CompanyNotFoundException } from '../exceptions/CompanyNotFoundException';

export class UpdateCompanyUseCase implements UpdateCompanyContract {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companiesRepository: CompanyRepository,
  ) {}

  async execute(id: number, data: UpdateCompanyDto) {
    data.cnpj =
      data.cnpj && data.cnpj.replace(/\D/g, '');

    const company = await this.companiesRepository.findById(id);

    if (!company) throw new CompanyNotFoundException();

    this.companiesRepository.merge(company, data);

    await this.companiesRepository.save(company);

    return company;
  }
}
