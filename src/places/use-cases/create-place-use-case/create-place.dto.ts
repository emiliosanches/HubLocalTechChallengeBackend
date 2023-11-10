export class CreatePlaceDto {
  constructor(
    public name: string,
    public zipcode: string,
    public street: string,
    public number: string,
    public neighborhood: string,
    public city: string,
    public state: string,
    public companyId: number,
  ) {}
}
