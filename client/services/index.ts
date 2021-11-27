import { CityService } from './CityService';
import { WeatherEntriesService } from './WeatherEntriesService';

export interface IDiContainer {
  cityAPI: CityService,
  entriesAPI: WeatherEntriesService,
}

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL as string);

const cityAPI = new CityService(baseUrl);
const entriesAPI = new WeatherEntriesService(baseUrl);

const services = {
  cityAPI,
  entriesAPI,
};

export {
  services,
};
