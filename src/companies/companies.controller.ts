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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    return this.companiesService.findOne(Number(id), request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() request: Request,
  ) {
    return this.companiesService.update(
      Number(id),
      updateCompanyDto,
      request.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.companiesService.remove(Number(id), request.user.id);
  }
}
