import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { Company } from 'src/companies/domain/company.entity';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from 'src/companies/use-cases/ports/company-repository';
import { Repository } from 'typeorm';

/**
 * To use this guard, the endpoint must have a path parameter called `companyId` and be protected by `JwtAuthGuard`, which must be executed before this guard.
 */
@Injectable()
export class CompanyAccessGuard implements CanActivate {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companiesRepository: CompanyRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const userId = request.user?.id;
    const companyId = request.params.companyId;

    if (!userId || !companyId)
      throw new Error(
        `User id or company id is not defined. Is the endpoint "${request.method} ${request.path}" protected by JwtAuthGuard and has a path parameter named "companyId"?`,
      );

    const company = await this.companiesRepository.findById(
      Number(companyId) || -1,
    );

    // allow executing if company doesn't exist, then the service should return 404
    return !company || userId === company.userId;
  }
}
