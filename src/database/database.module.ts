import { TypeOrmModule } from '@nestjs/typeorm';
import { datasource } from './datasource';

export const DatabaseModule = TypeOrmModule.forRoot(datasource.options);
