export class CompanyExistsException extends Error {
  constructor() {
    super("There's already a company with the given CNPJ");
    this.name = 'CompanyExistsException';
  }
 
}