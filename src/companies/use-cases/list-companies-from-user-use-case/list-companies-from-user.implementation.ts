import { ListCompaniesFromUserContract } from './list-companies-from-user.contract';
import { Inject } from '@nestjs/common';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '../ports/company-repository';

export class ListCompaniesFromUserUseCase
  implements ListCompaniesFromUserContract
{
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(userId: number, page: number, pageSize: number) {
    const { data, total } =
      await this.companyRepository.findPaginatedByUserIdWithPlacesAmount(
        userId,
        page,
        pageSize,
      );

    return {
      page: page,
      perPage: pageSize,
      total,
      data: data.map((company) => ({
        id: company.id,
        name: company.name,
        placesAmount: company.placesAmount,
      })),
    };
  }
}
