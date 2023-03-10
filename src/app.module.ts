import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [OrganizationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
