import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreatePlaceDto } from 'src/places/use-cases/create-place-use-case/create-place.dto';
import { IsCep } from 'src/validators/IsCep.decorator';

export class CreatePlaceRequest {
  @IsString()
  @ApiProperty()
  name: string;

  @IsCep()
  @ApiProperty()
  zipcode: string;

  @IsString()
  @ApiProperty()
  street: string;

  @IsString()
  @ApiProperty()
  number: string;

  @IsString()
  @ApiProperty()
  neighborhood: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;

  toUseCaseDto(companyId: number) {
    return new CreatePlaceDto(
      this.name,
      this.zipcode,
      this.street,
      this.number,
      this.neighborhood,
      this.city,
      this.state,
      companyId,
    );
  }
}
