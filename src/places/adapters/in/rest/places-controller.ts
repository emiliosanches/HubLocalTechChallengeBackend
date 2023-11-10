import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CompanyAccessGuard } from 'src/authorization/company-access.guard';
import {
  CREATE_PLACE_USE_CASE,
  CreatePlaceContract,
} from 'src/places/use-cases/create-place-use-case/create-place.contract';
import { CreatePlaceRequest } from './dto/create-place-request';
import { CompanyNotFoundException } from 'src/companies/use-cases/exceptions/CompanyNotFoundException';
import {
  GET_PLACE_BY_ID_USE_CASE,
  GetPlaceByIdContract,
} from 'src/places/use-cases/get-place-by-id-use-case/get-place-by-id.contract';
import {
  UPDATE_PLACE_USE_CASE,
  UpdatePlaceContract,
} from 'src/places/use-cases/update-place-use-case/update-place.contract';
import { UpdatePlaceRequest } from './dto/update-place-request';
import {
  LIST_PLACES_BY_COMPANY_USE_CASE,
  ListPlacesFromCompanyContract,
} from 'src/places/use-cases/list-places-from-company-use-case/list-places-from-company.contract';
import { ListPlacesRequestQuery } from './dto/list-places-request-query';
import {
  REMOVE_PLACE_USE_CASE,
  RemovePlaceContract,
} from 'src/places/use-cases/remove-place-use-case/remove-place.contract';
import { PlaceNotFoundException } from 'src/places/use-cases/exceptions/PlaceNotFoundException';

@ApiTags('Place')
@Controller('companies/:companyId/places')
export class PlacesController {
  constructor(
    @Inject(CREATE_PLACE_USE_CASE)
    private readonly createPlaceUseCase: CreatePlaceContract,
    @Inject(GET_PLACE_BY_ID_USE_CASE)
    private readonly getPlaceByIdUseCase: GetPlaceByIdContract,
    @Inject(UPDATE_PLACE_USE_CASE)
    private readonly updatePlaceUseCase: UpdatePlaceContract,
    @Inject(LIST_PLACES_BY_COMPANY_USE_CASE)
    private readonly listPlacesByCompanyUseCase: ListPlacesFromCompanyContract,
    @Inject(REMOVE_PLACE_USE_CASE)
    private readonly removePlaceUseCase: RemovePlaceContract,
  ) {}

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Post()
  async create(
    @Body() createPlaceRequest: CreatePlaceRequest,
    @Param('companyId') companyId: string,
  ) {
    try {
      return await this.createPlaceUseCase.execute(
        createPlaceRequest.toUseCaseDto(Number(companyId)),
      );
    } catch (error) {
      if (error instanceof CompanyNotFoundException)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Get()
  findAll(
    @Param('companyId') companyId: string,
    @Query() listPlacesDto: ListPlacesRequestQuery,
  ) {
    return this.listPlacesByCompanyUseCase.execute(
      Number(companyId),
      listPlacesDto.page,
      listPlacesDto.perPage,
    );
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Param('companyId') companyId: string) {
    try {
      return await this.getPlaceByIdUseCase.execute(Number(id), Number(companyId));
    } catch (error) {
      if (error instanceof PlaceNotFoundException) {
        throw new NotFoundException(error.message);
      } else throw error;
    }
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceRequest,
    @Param('companyId') companyId: string,
  ) {
    try {
      return await this.updatePlaceUseCase.execute(
        Number(id),
        Number(companyId),
        updatePlaceDto.toUseCaseDto(),
      );
    } catch (error) {
      if (error instanceof PlaceNotFoundException)
        throw new NotFoundException(error.message);
      else throw error;
    }
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Param('companyId') companyId: string) {
    try {
      return await this.removePlaceUseCase.execute(Number(id), Number(companyId));
    } catch (error) {
      if (error instanceof PlaceNotFoundException)
        throw new NotFoundException(error.message);
      else throw error;
    }
  }
}
