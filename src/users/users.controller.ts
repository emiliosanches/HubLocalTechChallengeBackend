import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
