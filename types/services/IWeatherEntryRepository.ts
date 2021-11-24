import { IPagination } from './common';

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

interface IWeatherEntriesFilter {
  date: string,
}

export type WeatherEntriesPagination = IPagination<IWeatherEntriesFilter>;

export interface IWeatherEntryRepository {
  getAllByCity: (city: string, pagination: WeatherEntriesPagination) => IWeatherEntry[];
}
