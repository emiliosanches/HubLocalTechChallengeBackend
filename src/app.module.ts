import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { DatabaseModule } from './database/database.module';
import { EnvConfig } from './env';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';
import { AuthModule } from './auth/auth.module';
import { ClassSerializerInterceptor } from '@nestjs/common';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: EnvConfig,
      load: dotenvLoader(),
      normalize: (config) => {
        config.DB_PORT = Number(config.DB_PORT);
        return config;
      },
    }),
    DatabaseModule,
    CompaniesModule,
    UsersModule,
    PlacesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
