import { IWeatherEntry } from '../../types/services/IWeatherEntryRepository';

export class WeatherEntriesService {
  constructor(
    private baseUrl: string,
  ) {}

  async getAll(cityName: string, page: number = 1, perPage: number = 7): Promise<IWeatherEntry[]> {
    // TODO add date filter support
    const body = {
      page,
      perPage,
    };

    // TODO extract common fetching logic to abstract class
    const response = await fetch(`${this.baseUrl}/entries/${cityName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const { data: entries } = await response.json();

    return entries;
  }
}
