export class CompanyNotFoundException extends Error {
  constructor() {
    super("No company was found with the given id");
    this.name = "CompanyNotFoundException";
  }
}