import { Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { DatabaseModule } from './database/database.module';
import { EnvConfig } from './env';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';
import { AuthModule } from './auth/auth.module';

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
  providers: [],
})
export class AppModule {}
