import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersRepository.findOne({
      select: ['id', 'name', 'email', 'password'],
      where: {
        email,
      },
    });

    if (user && (await compare(pass, user.password))) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);

    if (!user)
      throw new UnauthorizedException({
        message: 'Wrong email or password',
      });

    return {
      user,
      access_token: this.jwtService.sign({ sub: user.id }),
    };
  }
}
