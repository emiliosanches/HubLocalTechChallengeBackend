import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfig } from 'src/env';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  useFactory: async (config: EnvConfig) => ({
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsRun: true,
  }),
  inject: [EnvConfig],
});
