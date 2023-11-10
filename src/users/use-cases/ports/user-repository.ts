import { User } from "src/users/domain/user.entity";

export interface UserRepository {
  exists(email: string): Promise<boolean>;
  save(user: User): Promise<User>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
