import { Company } from 'src/companies/domain/company.entity';
import { CreateCompanyDto } from './create-company.dto';

export interface CreateCompanyContract {
  execute(company: CreateCompanyDto): Promise<Company>;
}

export const CREATE_COMPANY_USE_CASE = 'CREATE_COMPANY_USE_CASE';
