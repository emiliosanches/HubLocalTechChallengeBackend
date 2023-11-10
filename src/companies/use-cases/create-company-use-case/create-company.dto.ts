export class CreateCompanyDto {
  constructor(
    public name: string,
    public cnpj: string,
    public website: string,
    public userId: number,
  ) {}
}
