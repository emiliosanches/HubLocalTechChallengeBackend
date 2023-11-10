import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';
import { UpdateCompanyDto } from 'src/companies/use-cases/update-company-use-case/update-company.dto';
import { IsCnpj } from 'src/validators/IsCnpj.decorator';

export class UpdateCompanyRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @IsCnpj()
  @IsOptional()
  @ApiPropertyOptional()
  cnpj?: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  website?: string;

  toUseCaseDto() {
    return new UpdateCompanyDto(this.name, this.cnpj, this.website);
  }
}
