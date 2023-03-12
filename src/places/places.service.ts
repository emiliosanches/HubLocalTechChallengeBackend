import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto, companyId: number) {
    const place = this.placesRepository.create({
      ...createPlaceDto,
      companyId,
    });

    await this.placesRepository.save(place);

    return place;
  }

  async findAll(companyId: number, page = 1, perPage = 10) {
    const [data, total] = await this.placesRepository.findAndCount({
      select: ['id', 'name'],
      take: perPage,
      skip: perPage * (page - 1),
      where: {
        companyId,
      },
    });

    return {
      page: page,
      perPage: perPage,
      total,
      data,
    };
  }

  async findOne(id: number, companyId: number) {
    const place = await this.placesRepository.findOne({
      where: {
        id,
        companyId,
      },
    });

    if (!place) throw new NotFoundException();

    return place;
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto, companyId: number) {
    const place = await this.findOne(id, companyId);

    this.placesRepository.merge(place, updatePlaceDto);

    await this.placesRepository.save(place);

    return place;
  }

  async remove(id: number, companyId: number) {
    const place = await this.findOne(id, companyId);

    this.placesRepository.remove(place);
  }
}
