export class UpdateCompanyDto {
  constructor(
    public name?: string,
    public cnpj?: string,
    public website?: string,
  ) {}
}
