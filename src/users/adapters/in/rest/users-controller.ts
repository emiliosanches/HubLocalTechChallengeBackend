import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Inject,
  ConflictException,
} from '@nestjs/common';
import {
  CREATE_USER_USE_CASE,
  CreateUserContract,
} from '../../../use-cases/create-user-use-case/create-user.contract';
import { CreateUserRequest } from './dto/create-user-request';
import { UserExistsException } from 'src/users/use-cases/exceptions/UserExistsException';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: CreateUserContract,
  ) {}

  @Post()
  async signUp(@Body() createUserDto: CreateUserRequest) {
    try {
      return await this.createUserUseCase.execute(createUserDto.toUseCaseDto());
    } catch (error) {
      if (error instanceof UserExistsException)
        throw new ConflictException(error.message);
      else throw error;
    }
  }
}
