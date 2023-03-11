import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, loggedUserId: number) {
    createCompanyDto.cnpj = createCompanyDto.cnpj.replace(/\D/g, '');

    const companyWithCnpj = await this.companiesRepository.findOne({
      where: {
        cnpj: createCompanyDto.cnpj,
      },
    });

    if (companyWithCnpj) {
      throw new ConflictException({
        message: 'There is already a company with the informed CNPJ',
      });
    }

    return await this.companiesRepository.save({
      ...createCompanyDto,
      userId: loggedUserId,
    });
  }

  async findAll(loggedUserId: number, page = 1, perPage = 10) {
    const [data, total] = await this.companiesRepository.findAndCount({
      relations: ['places'],
      take: perPage,
      skip: perPage * (page - 1),
      where: {
        userId: loggedUserId,
      },
    });

    return {
      page: page,
      perPage: perPage,
      total,
      data: data.map((company) => ({
        id: company.id,
        name: company.name,
        placesAmount: company.places.length,
      })),
    };
  }

  async findOne(id: number, loggedUserId: number) {
    const company = await this.companiesRepository.findOne({
      where: {
        id,
      },
    });

    if (!company) throw new NotFoundException();

    if (company.userId !== loggedUserId) {
      throw new UnauthorizedException({
        message: "You're not the owner of this company",
      });
    }

    return company;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
    loggedUserId: number,
  ) {
    updateCompanyDto.cnpj =
      updateCompanyDto.cnpj && updateCompanyDto.cnpj.replace(/\D/g, '');

    const company = await this.findOne(id, loggedUserId);

    this.companiesRepository.merge(company, updateCompanyDto);

    await this.companiesRepository.save(company);

    return company;
  }

  async remove(id: number, loggedUserId) {
    const company = await this.findOne(id, loggedUserId);

    await this.companiesRepository.remove(company);
  }
}
