import { Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { DatabaseModule } from './database/database.module';
import { EnvConfig } from './env';
import { OrganizationsModule } from './organizations/organizations.module';

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
    OrganizationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
