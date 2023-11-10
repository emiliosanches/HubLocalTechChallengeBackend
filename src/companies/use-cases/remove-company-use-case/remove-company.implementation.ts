import { RemoveCompanyContract } from './remove-company.contract';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '../ports/company-repository';
import { Inject } from '@nestjs/common';
import { CompanyNotFoundException } from '../exceptions/CompanyNotFoundException';

export class RemoveCompanyUseCase implements RemoveCompanyContract {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companiesRepository: CompanyRepository,
  ) {}

  async execute(id: number) {
    const companyExists = await this.companiesRepository.findById(id);

    if (!companyExists) throw new CompanyNotFoundException();

    await this.companiesRepository.removeById(id);
  }
}
