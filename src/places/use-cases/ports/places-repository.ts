import { Place } from "src/places/domain/place.entity";

export interface PlacesRepository {
  save(place: Place): Promise<Place>;
  findPaginatedByCompanyId(
    companyId: number,
    page: number,
    
    pageSize: number,
  ): Promise<{ total: number; data: Place[] }>;
  findByCompanyIdAndId(companyId: number, id: number): Promise<Place>;
  removeById(id: number): Promise<void>;
  merge(target: Place, source: Partial<Place>): void;
}

export const PLACES_REPOSITORY = 'PLACES_REPOSITORY';
