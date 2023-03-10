import { TypeOrmModule } from '@nestjs/typeorm/dist';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  useFactory: async () => ({
    //todo replace process.env with config service
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  }),
});
