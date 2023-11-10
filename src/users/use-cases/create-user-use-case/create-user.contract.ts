import { User } from '../../domain/user.entity';
import { CreateUserDto } from './create-user.dto';

export interface CreateUserContract {
  execute(user: CreateUserDto): Promise<User>;
}

export const CREATE_USER_USE_CASE = 'CREATE_USER_USE_CASE';
