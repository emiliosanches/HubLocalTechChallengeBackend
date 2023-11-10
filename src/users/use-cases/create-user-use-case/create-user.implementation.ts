import { User } from 'src/users/domain/user.entity';
import { CreateUserContract } from './create-user.contract';
import { CreateUserDto } from './create-user.dto';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../ports/user-repository';
import { UserExistsException } from '../exceptions/UserExistsException';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class CreateUserUseCase implements CreateUserContract {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(data: CreateUserDto) {
    const userExists = await this.userRepository.exists(data.email);

    if (userExists) {
      throw new UserExistsException();
    }

    const salt = await genSalt(15);

    let user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = await hash(data.password, salt);

    user = await this.userRepository.save(user);
    return user;
  }
}
