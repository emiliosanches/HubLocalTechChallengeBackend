export interface RemovePlaceContract {
  execute(companyId: number, id: number): Promise<void>;
}

export const REMOVE_PLACE_USE_CASE = 'REMOVE_PLACE_USE_CASE';
