export interface IWeatherEntry {
  station_id: number,
  place_name: string,
  latitude: number,
  longitude: number,
  datetime: string,
  temperature_max: string,
  temperature_min: string,
  precipitation_probability: string,
  precipitation_mm: string,
}

// TODO move to common types
export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

// TODO move to common types
interface IPagination<T extends object> {
  order?: OrderBy,
  page: number,
  limit?: number,
  filters?: T,
}

interface IWeatherEntriesFilter {
  date: string,
}

export type WeatherEntriesPagination = IPagination<IWeatherEntriesFilter>;

export interface IWeatherEntryRepository {
  getAllByCity: (city: string, pagination: WeatherEntriesPagination) => IWeatherEntry[];
}
