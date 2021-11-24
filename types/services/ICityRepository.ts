import { IPagination } from './common';

interface ICityFilter {
  name: string,
}

export type ICityPagination = IPagination<ICityFilter>;

export interface ICityRepository {
  getAllNames(pagination: ICityPagination): string[];
}
