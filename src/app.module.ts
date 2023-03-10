import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [DatabaseModule, OrganizationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
