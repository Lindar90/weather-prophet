import { Order } from '../../../types/services/common';
import { IWeatherEntry } from '../../../types/services/IWeatherEntryRepository';

export abstract class AbstractRepository {
  constructor(
    protected entries: IWeatherEntry[],
  ) {}

  protected sort(entries: IWeatherEntry[], order: Order = Order.DESC) {
    return entries.sort((a, b) => {
      if (order === Order.ASC) {
        return Date.parse(a.datetime) - Date.parse(b.datetime);
      }

      return Date.parse(b.datetime) - Date.parse(a.datetime);
    });
  }

  protected paginate(entries: any[], page: number, perPage: number = 2) {
    return entries.slice((page - 1) * perPage, page * perPage);
  }

  protected sortAndPaginate(
    entries: IWeatherEntry[],
    page: number,
    perPage?: number,
    order?: Order,
  ) {
    return this.paginate(
      this.sort(entries, order),
      page,
      perPage,
    );
  }
}
