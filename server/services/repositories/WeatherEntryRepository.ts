import {
  IWeatherEntry,
  WeatherEntriesPagination,
  IWeatherEntryRepository,
} from '../../../types/services/IWeatherEntryRepository';
import { AbstractRepository } from './AbstractRepository';

export class WeatherEntryRepository extends AbstractRepository implements IWeatherEntryRepository {
  getAllByCity(city: string, pagination: WeatherEntriesPagination): IWeatherEntry[] {
    const { filters } = pagination;

    let filteredEntries = this.entries.filter((entry) => entry.place_name === city);

    if (filters) {
      filteredEntries = filteredEntries.filter((entry) => entry.datetime === filters.date);
    }

    return this.sortAndPaginate(
      filteredEntries,
      pagination.page,
      pagination.perPage,
      pagination.order,
    );
  }
}
