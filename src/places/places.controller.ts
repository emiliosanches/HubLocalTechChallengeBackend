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
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CompanyAccessGuard } from 'src/authorization/company-access.guard';
import { ListPlacesDto } from './dto/list-places.dto';

@ApiTags('Place')
@Controller('companies/:companyId/places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Post()
  create(
    @Body() createPlaceDto: CreatePlaceDto,
    @Param('companyId') companyId: string,
  ) {
    return this.placesService.create(createPlaceDto, Number(companyId));
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Get()
  findAll(
    @Param('companyId') companyId: string,
    @Query() listPlacesDto: ListPlacesDto,
  ) {
    return this.placesService.findAll(
      Number(companyId),
      listPlacesDto.page,
      listPlacesDto.perPage,
    );
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Param('companyId') companyId: string) {
    return this.placesService.findOne(Number(id), Number(companyId));
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
    @Param('companyId') companyId: string,
  ) {
    return this.placesService.update(
      Number(id),
      updatePlaceDto,
      Number(companyId),
    );
  }

  @UseGuards(JwtAuthGuard, CompanyAccessGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Param('companyId') companyId: string) {
    return this.placesService.remove(+Number(id), Number(companyId));
  }
}
