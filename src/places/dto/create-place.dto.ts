import { IsString } from "class-validator";
import { IsCep } from "src/validators/IsCEP.decorator";

export class CreatePlaceDto {
  @IsString()
  name: string;

  @IsCep()
  zipcode: string;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}
