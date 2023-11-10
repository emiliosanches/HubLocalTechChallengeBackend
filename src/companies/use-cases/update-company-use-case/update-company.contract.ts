import { Company } from 'src/companies/domain/company.entity';
import { UpdateCompanyDto } from './update-company.dto';

export interface UpdateCompanyContract {
  execute(id: number, company: UpdateCompanyDto): Promise<Company>;
}

export const UPDATE_COMPANY_USE_CASE = 'UPDATE_COMPANY_USE_CASE';
