import { Company } from 'src/companies/domain/company.entity';

export type CompanyWithPlacesAmount = Company & {
  placesAmount: number;
}

export interface CompanyRepository {
  exists(cnpj: string): Promise<boolean>;
  save(company: Company): Promise<Company>;
  findPaginatedByUserIdWithPlacesAmount(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<{
    total: number;
    data: CompanyWithPlacesAmount[];
  }>;
  findById(id: number): Promise<Company>;
  removeById(id: number): Promise<void>;
  merge(target: Company, source: Partial<Company>): void;
}

export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY';
