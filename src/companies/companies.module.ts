import { Module } from '@nestjs/common';
import { OrganizationsService } from './companies.service';
import { OrganizationsController } from './companies.controller';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
