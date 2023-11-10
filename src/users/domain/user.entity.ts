import { Company } from "src/companies/domain/company.entity";

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  companies: Company[];
}
