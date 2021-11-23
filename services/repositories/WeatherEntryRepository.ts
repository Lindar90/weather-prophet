import {
  IWeatherEntry, IWeatherEntryRepository, OrderBy, WeatherEntriesPagination,
} from './IWeatherEntryRepository';

export class WeatherEntryRepository implements IWeatherEntryRepository {
  constructor(
    private entries: IWeatherEntry[],
  ) {}

  getAllByCity(city: string, pagination: WeatherEntriesPagination): IWeatherEntry[] {
    const {
      order = OrderBy.DESC,
      limit = 2,
      page,
      filters,
    } = pagination;

    let filteredEntries = this.entries
      .filter((entry) => entry.place_name === city)
      .sort((a, b) => {
        if (order === OrderBy.ASC) {
          return Date.parse(a.datetime) - Date.parse(b.datetime);
        }

        return Date.parse(b.datetime) - Date.parse(a.datetime);
      });

    if (filters) {
      filteredEntries = filteredEntries.filter((entry) => entry.datetime === filters.date);
    }

    return filteredEntries.slice((page - 1) * limit, page * limit);
  }
}
