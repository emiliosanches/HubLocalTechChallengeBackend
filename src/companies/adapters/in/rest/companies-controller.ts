import {
  ConflictException,
  Inject,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateCompanyRequest } from './dto/create-company-request';
import {
  CREATE_COMPANY_USE_CASE,
  CreateCompanyContract,
} from 'src/companies/use-cases/create-company-use-case/create-company.contract';
import {
  LIST_COMPANIES_USE_CASE,
  ListCompaniesFromUserContract,
} from 'src/companies/use-cases/list-companies-from-user-use-case/list-companies-from-user.contract';
import {
  GET_COMPANY_BY_ID_USE_CASE,
  GetCompanyByIdContract,
} from 'src/companies/use-cases/get-company-by-id-use-case/get-company-by-id.contract';
import { CompanyAccessGuard } from 'src/authorization/company-access.guard';
import {
  UPDATE_COMPANY_USE_CASE,
  UpdateCompanyContract,
} from 'src/companies/use-cases/update-company-use-case/update-company.contract';
import {
  REMOVE_COMPANY_USE_CASE,
  RemoveCompanyContract,
} from 'src/companies/use-cases/remove-company-use-case/remove-company.contract';
import { CompanyNotFoundException } from 'src/companies/use-cases/exceptions/CompanyNotFoundException';
import { CompanyExistsException } from 'src/companies/use-cases/exceptions/CompanyExistsException';
import { UpdateCompanyRequest } from './dto/update-company-request';
import { ListCompanyRequestQuery } from './dto/list-company-request-query';

@ApiTags('Company')
@Controller('companies')
export class CompaniesController {
  constructor(
    @Inject(CREATE_COMPANY_USE_CASE)
    private readonly createCompanyUseCase: CreateCompanyContract,
    @Inject(LIST_COMPANIES_USE_CASE)
    private readonly listCompaniesFromUsersUseCase: ListCompaniesFromUserContract,
    @Inject(GET_COMPANY_BY_ID_USE_CASE)
    private readonly getCompanyByIdUseCase: GetCompanyByIdContract,
    @Inject(UPDATE_COMPANY_USE_CASE)
    private readonly updateCompanyUseCase: UpdateCompanyContract,
    @Inject(REMOVE_COMPANY_USE_CASE)
    private readonly removeCompanyUseCase: RemoveCompanyContract,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyRequest,
    @Req() request: Request,
  ) {
    try {
      return await this.createCompanyUseCase.execute(
        createCompanyDto.toUseCaseDto(request.user.id),
      );
    } catch (error) {
      if (error instanceof CompanyExistsException)
        throw new ConflictException(error.message);
      else throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: ListCompanyRequestQuery, @Req() request: Request) {
    return this.listCompaniesFromUsersUseCase.execute(
      request.user.id,
      query.page,
      query.perPage,
    );
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Get(':companyId')
  async findOne(@Param('companyId') id: string) {
    try {
      return await this.getCompanyByIdUseCase.execute(Number(id));
    } catch (error) {
      if (error instanceof CompanyNotFoundException)
        throw new NotFoundException(error.message);
      else throw error;
    }
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Patch(':companyId')
  async update(
    @Param('companyId') id: string,
    @Body() updateCompanyDto: UpdateCompanyRequest,
  ) {
    try {
      return await this.updateCompanyUseCase.execute(
        Number(id),
        updateCompanyDto.toUseCaseDto(),
      );
    } catch (error) {
      if (error instanceof CompanyNotFoundException)
        throw new NotFoundException(error.message);
      else throw error;
    }
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Delete(':companyId')
  async remove(@Param('companyId') id: string) {
    try {
      return await this.removeCompanyUseCase.execute(Number(id));
    } catch (error) {
      if (error instanceof CompanyNotFoundException)
        throw new NotFoundException(error.message);
      else throw error;
    }
  }
}
