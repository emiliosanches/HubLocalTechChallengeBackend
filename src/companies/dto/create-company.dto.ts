import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNumberString, IsString, IsUrl, Length } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsNumberString()
  @Length(14, 14)
  @ApiProperty()
  cnpj: string;

  @IsUrl()
  @ApiProperty()
  website: string;
}
