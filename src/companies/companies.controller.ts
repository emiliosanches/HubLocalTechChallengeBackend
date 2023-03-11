import { Query } from '@nestjs/common';
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
import { CompanyAccessGuard } from 'src/authorization/company-access.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ListCompaniesDto } from './dto/list-companies.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('Company')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @Req() request: Request) {
    return this.companiesService.create(createCompanyDto, request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: ListCompaniesDto, @Req() request: Request) {
    return this.companiesService.findAll(
      request.user.id,
      query.page,
      query.perPage,
    );
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Get(':companyId')
  findOne(@Param('companyId') id: string) {
    return this.companiesService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Patch(':companyId')
  update(
    @Param('companyId') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(Number(id), updateCompanyDto);
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Delete(':companyId')
  remove(@Param('companyId') id: string) {
    return this.companiesService.remove(Number(id));
  }
}
