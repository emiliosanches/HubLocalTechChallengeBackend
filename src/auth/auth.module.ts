import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfig } from 'src/env';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserTypeorm } from 'src/users/adapters/out/typeorm/typeorm-user-entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (env: EnvConfig) => ({
        secret: env.JWT_SECRET,
        signOptions: {
          expiresIn: '7d',
        },
      }),
      inject: [EnvConfig],
    }),
    TypeOrmModule.forFeature([UserTypeorm]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
