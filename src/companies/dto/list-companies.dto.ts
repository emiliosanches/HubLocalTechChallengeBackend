import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ListCompaniesDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  perPage: number;
}
