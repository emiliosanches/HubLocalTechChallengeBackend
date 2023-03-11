import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsUrl } from 'class-validator';
import { IsCnpj } from 'src/validators/IsCnpj.decorator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsCnpj()
  @ApiProperty()
  cnpj: string;

  @IsUrl()
  @ApiProperty()
  website: string;
}
