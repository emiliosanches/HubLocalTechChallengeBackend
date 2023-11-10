import { Provider } from "@nestjs/common";
import { USER_REPOSITORY } from "src/users/use-cases/ports/user-repository";
import { TypeormUsersRepository } from "./typeorm/typeorm-users-repository";

export const ServicesOut: Provider[] = [
  { provide: USER_REPOSITORY, useClass: TypeormUsersRepository }
]