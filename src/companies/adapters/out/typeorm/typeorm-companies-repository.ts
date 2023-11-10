import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository, CompanyWithPlacesAmount } from 'src/companies/use-cases/ports/company-repository';
import { CompanyTypeorm } from './typeorm-company-entity';
import { Repository } from 'typeorm';

export class TypeormCompaniesRepository implements CompanyRepository {
  constructor(
    @InjectRepository(CompanyTypeorm)
    private readonly companyRepo: Repository<CompanyTypeorm>,
  ) {}

  async findPaginatedByUserIdWithPlacesAmount(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<{ total: number; data: CompanyWithPlacesAmount[] }> {
    const [data, total] = await this.companyRepo.findAndCount({
      relations: ['places'],
      where: {
        userId,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      data: data.map((c) => ({ ...c, placesAmount: c.places?.length ?? 0 })),
      total,
    };
  }

  findById(id: number): Promise<CompanyTypeorm> {
    return this.companyRepo.findOne({
      where: {
        id,
      },
    });
  }

  async removeById(id: number): Promise<void> {
    const company = await this.findById(id);

    await this.companyRepo.remove(company);
  }

  merge(target: CompanyTypeorm, source: Partial<CompanyTypeorm>): void {
    this.companyRepo.merge(target, source);
  }

  async exists(cnpj: string): Promise<boolean> {
    const company = await this.companyRepo.findOne({
      where: {
        cnpj,
      },
    });

    return !!company;
  }

  save(company: CompanyTypeorm): Promise<CompanyTypeorm> {
    return this.companyRepo.save(company);
  }
}
