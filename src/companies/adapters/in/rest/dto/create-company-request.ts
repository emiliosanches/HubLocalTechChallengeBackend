import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";
import { CreateCompanyDto } from "src/companies/use-cases/create-company-use-case/create-company.dto";
import { IsCnpj } from "src/validators/IsCnpj.decorator";

export class CreateCompanyRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @IsCnpj()
  @ApiProperty()
  cnpj: string;

  @IsUrl()
  @ApiProperty()
  website: string;

  toUseCaseDto(userId: number) {
    return new CreateCompanyDto(
      this.name,
      this.cnpj,
      this.website,
      userId,
    );
  }
}