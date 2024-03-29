import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { CreateUserDto } from 'src/users/use-cases/create-user-use-case/create-user.dto';

export class CreateUserRequest {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must have at least: 8 characters, including a lowercase, an uppercase, a number and a symbol',
    },
  )
  @ApiProperty()
  password: string;

  toUseCaseDto() {
    return new CreateUserDto(this.name, this.email, this.password);
  }
}
