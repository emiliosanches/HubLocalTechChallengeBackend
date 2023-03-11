import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-company.dto';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
