import { GetCompanyByIdContract } from './get-company-by-id.contract';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '../ports/company-repository';
import { Inject } from '@nestjs/common';
import { CompanyNotFoundException } from '../exceptions/CompanyNotFoundException';

export class GetCompanyByIdUseCase implements GetCompanyByIdContract {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companiesRepository: CompanyRepository,
  ) {}

  async execute(id: number) {
    const company = await this.companiesRepository.findById(id);

    if (!company) throw new CompanyNotFoundException();

    return company;
  }
}
