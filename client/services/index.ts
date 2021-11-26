import { createContext } from 'react';
import { CityService } from './CityService';

export interface IDiContainer {
  cityAPI: CityService,
}

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL as string);

const cityAPI = new CityService(baseUrl);

const services = {
  cityAPI,
};

const ServicesContext = createContext(services);

export {
  services,
  ServicesContext,
};
