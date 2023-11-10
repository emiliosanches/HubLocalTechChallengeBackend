import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserTypeorm } from 'src/users/adapters/out/typeorm/typeorm-user-entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserTypeorm)
    private readonly usersRepository: Repository<UserTypeorm>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (user && (await compare(pass, user.password))) {
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
