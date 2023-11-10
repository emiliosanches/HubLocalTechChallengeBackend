import { Provider } from '@nestjs/common';
import { CREATE_COMPANY_USE_CASE } from './create-company-use-case/create-company.contract';
import { CreateCompanyUseCase } from './create-company-use-case/create-company.implementation';
import { LIST_COMPANIES_USE_CASE } from './list-companies-from-user-use-case/list-companies-from-user.contract';
import { ListCompaniesFromUserUseCase } from './list-companies-from-user-use-case/list-companies-from-user.implementation';
import { GET_COMPANY_BY_ID_USE_CASE } from './get-company-by-id-use-case/get-company-by-id.contract';
import { GetCompanyByIdUseCase } from './get-company-by-id-use-case/get-company-by-id.implementation';
import { UPDATE_COMPANY_USE_CASE } from './update-company-use-case/update-company.contract';
import { UpdateCompanyUseCase } from './update-company-use-case/update-company.implementation';
import { RemoveCompanyUseCase } from './remove-company-use-case/remove-company.implementation';
import { REMOVE_COMPANY_USE_CASE } from './remove-company-use-case/remove-company.contract';

export const Services: Provider[] = [
  { provide: CREATE_COMPANY_USE_CASE, useClass: CreateCompanyUseCase },
  { provide: LIST_COMPANIES_USE_CASE, useClass: ListCompaniesFromUserUseCase },
  { provide: GET_COMPANY_BY_ID_USE_CASE, useClass: GetCompanyByIdUseCase },
  { provide: UPDATE_COMPANY_USE_CASE, useClass: UpdateCompanyUseCase },
  { provide: REMOVE_COMPANY_USE_CASE, useClass: RemoveCompanyUseCase },
];
