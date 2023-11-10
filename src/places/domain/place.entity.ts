import { Company } from "src/companies/domain/company.entity";

export class Place {
  id: number;
  name: string;
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  companyId: number;
  company: Company;
}
