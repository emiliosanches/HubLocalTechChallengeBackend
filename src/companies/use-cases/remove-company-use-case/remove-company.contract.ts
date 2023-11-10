export interface RemoveCompanyContract {
  execute(id: number): Promise<void>;
}

export const REMOVE_COMPANY_USE_CASE = 'REMOVE_COMPANY_USE_CASE';
