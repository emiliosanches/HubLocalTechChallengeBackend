import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { UserTypeorm } from 'src/users/adapters/out/typeorm/typeorm-user-entity';
import { CompanyTypeorm } from 'src/companies/adapters/out/typeorm/typeorm-company-entity';
import { PlaceTypeorm } from 'src/places/adapters/out/typeorm/typeorm-place-entity';

config();

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserTypeorm, CompanyTypeorm, PlaceTypeorm],
  migrations: [join(__dirname, 'migrations/*.{ts,js}')],
  migrationsRun: true,
});
