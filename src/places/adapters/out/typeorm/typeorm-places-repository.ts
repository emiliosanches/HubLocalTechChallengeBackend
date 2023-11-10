import { PlacesRepository } from 'src/places/use-cases/ports/places-repository';
import { PlaceTypeorm } from './typeorm-place-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TypeormPlacesRepository implements PlacesRepository {
  constructor(
    @InjectRepository(PlaceTypeorm)
    private readonly placeRepo: Repository<PlaceTypeorm>,
  ) {}

  save(place: PlaceTypeorm): Promise<PlaceTypeorm> {
    return this.placeRepo.save(place);
  }

  async findPaginatedByCompanyId(
    companyId: number,
    page: number,
    pageSize: number,
  ): Promise<{ total: number; data: PlaceTypeorm[] }> {
    const [data, total] = await this.placeRepo.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        companyId,
      },
    });

    return { total, data };
  }

  findByCompanyIdAndId(companyId: number, id: number): Promise<PlaceTypeorm> {
    return this.placeRepo.findOne({
      where: {
        id,
        companyId,
      },
    });
  }

  async removeById(id: number): Promise<void> {
    const place = await this.placeRepo.findOne({
      where: { id },
    });

    await this.placeRepo.remove(place);
  }

  merge(target: PlaceTypeorm, source: Partial<PlaceTypeorm>): void {
    this.placeRepo.merge(target, source);
  }
}
