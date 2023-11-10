import { Place } from "src/places/domain/place.entity";
import { User } from "src/users/domain/user.entity";

export class Company {
  id: number;
  name: string;
  cnpj: string;
  website: string;
  userId: number;
  user: User;
  places: Place[];
}