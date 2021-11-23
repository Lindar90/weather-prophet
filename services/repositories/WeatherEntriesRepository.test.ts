import { WeatherEntryRepository } from './WeatherEntryRepository';
import { OrderBy } from './IWeatherEntryRepository';

const data = [
  {
    station_id: 1438,
    place_name: 'Amsterdam',
    latitude: 52.3,
    longitude: 4.766667,
    datetime: '2014-08-12 00:00:00',
    temperature_max: '20.9',
    temperature_min: '14.2',
    precipitation_probability: '75',
    precipitation_mm: '6.6',
  },
  {
    station_id: 1438,
    place_name: 'Amsterdam',
    latitude: 52.3,
    longitude: 4.766667,
    datetime: '2014-08-08 00:00:00',
    temperature_max: '24.2',
    temperature_min: '15.1',
    precipitation_probability: '90',
    precipitation_mm: '6.0',
  },
  {
    station_id: 1439,
    place_name: 'Den Helder',
    latitude: 52.91667,
    longitude: 4.783333,
    datetime: '2014-08-08 00:00:00',
    temperature_max: '24.5',
    temperature_min: '16.0',
    precipitation_probability: '90',
    precipitation_mm: '5.1',
  },
  {
    station_id: 1438,
    place_name: 'Amsterdam',
    latitude: 52.3,
    longitude: 4.766667,
    datetime: '2014-08-09 00:00:00',
    temperature_max: '23.0',
    temperature_min: '16.7',
    precipitation_probability: '70',
    precipitation_mm: '3.3',
  },
  {
    station_id: 1439,
    place_name: 'Den Helder',
    latitude: 52.91667,
    longitude: 4.783333,
    datetime: '2014-08-10 00:00:00',
    temperature_max: '25.3',
    temperature_min: '14.8',
    precipitation_probability: '85',
    precipitation_mm: '9.8',
  },
  {
    station_id: 1438,
    place_name: 'Amsterdam',
    latitude: 52.3,
    longitude: 4.766667,
    datetime: '2014-08-10 00:00:00',
    temperature_max: '25.6',
    temperature_min: '14.8',
    precipitation_probability: '85',
    precipitation_mm: '11.8',
  },
  {
    station_id: 1438,
    place_name: 'Amsterdam',
    latitude: 52.3,
    longitude: 4.766667,
    datetime: '2014-08-11 00:00:00',
    temperature_max: '21.8',
    temperature_min: '15.3',
    precipitation_probability: '75',
    precipitation_mm: '4.5',
  },
  {
    station_id: 1439,
    place_name: 'Den Helder',
    latitude: 52.91667,
    longitude: 4.783333,
    datetime: '2014-08-09 00:00:00',
    temperature_max: '21.8',
    temperature_min: '17.7',
    precipitation_probability: '65',
    precipitation_mm: '7.7',
  },
];

describe('WeatherEntryRepository', () => {
  let repository: WeatherEntryRepository;

  beforeEach(() => {
    repository = new WeatherEntryRepository(data);
  });

  it('should search by city', () => {
    // Check default limit
    expect(repository.getAllByCity('Amsterdam', { page: 1 })).toHaveLength(2);

    // Check explicit limit
    expect(repository.getAllByCity('Amsterdam', { page: 1, limit: 5 })).toHaveLength(5);
    expect(repository.getAllByCity('Amsterdam', { page: 1, limit: 10 })).toHaveLength(5);

    // Check filter
    expect(
      repository.getAllByCity('Amsterdam', {
        page: 1,
        limit: 10,
        filters: { date: '2014-08-11 00:00:00' },
      })[0].temperature_max,
    ).toBe('21.8');

    // Check sort ASC
    expect(
      repository.getAllByCity('Amsterdam', {
        page: 1,
      })[0].datetime,
    ).toBe('2014-08-12 00:00:00');

    // Check sort DESC
    expect(
      repository.getAllByCity('Amsterdam', {
        page: 1,
        order: OrderBy.ASC,
      })[0].datetime,
    ).toBe('2014-08-08 00:00:00');
  });
});
