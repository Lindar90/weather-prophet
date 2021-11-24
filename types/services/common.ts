export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IPagination<T extends object> {
  order?: Order,
  page: number,
  perPage?: number,
  filters?: T,
}
