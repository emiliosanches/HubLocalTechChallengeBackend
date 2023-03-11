import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await genSalt(15);

    const user = await this.usersRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await hash(createUserDto.password, salt),
    });

    delete user.password;

    return user;
  }
}
