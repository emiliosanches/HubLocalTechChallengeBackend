import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvConfig } from 'src/env';
import { UserTypeorm } from 'src/users/adapters/out/typeorm/typeorm-user-entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserTypeorm)
    private readonly usersRepository: Repository<UserTypeorm>,
    env: EnvConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.usersRepository.findOne({
      where: {
        id: payload.sub,
      },
    });

    if (!user)
      throw new UnauthorizedException({
        message: 'Invalid authentication token provided',
      });

    return user;
  }
}
