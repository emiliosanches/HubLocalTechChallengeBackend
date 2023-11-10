import { Company } from 'src/companies/domain/company.entity';

export interface GetCompanyByIdContract {
  execute(id: number): Promise<Company>;
}

export const GET_COMPANY_BY_ID_USE_CASE = 'GET_COMPANY_BY_ID_USE_CASE';
