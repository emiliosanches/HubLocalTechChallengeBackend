import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { Transform } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';

export class ListCompaniesDto {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  perPage: number;
}
