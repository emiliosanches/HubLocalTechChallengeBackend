import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';
import { UpdatePlaceDto } from 'src/places/use-cases/update-place-use-case/update-place.dto';
import { IsCep } from 'src/validators/IsCep.decorator';

export class UpdatePlaceRequest {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsCep()
  @IsOptional()
  @ApiPropertyOptional()
  zipcode: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  street: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  number: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  neighborhood: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  city: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  state: string;

  toUseCaseDto() {
    return new UpdatePlaceDto(
      this.name,
      this.zipcode,
      this.street,
      this.number,
      this.neighborhood,
      this.city,
      this.state,
    );
  }
}
