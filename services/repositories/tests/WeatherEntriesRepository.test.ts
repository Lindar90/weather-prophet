import { WeatherEntryRepository } from '../WeatherEntryRepository';
import { Order } from '../../../types/services/common';
import data from './data.test.json';

describe('WeatherEntryRepository', () => {
  let repository: WeatherEntryRepository;

  beforeEach(() => {
    repository = new WeatherEntryRepository(data);
  });

  it('should search by city', () => {
    // Check default limit
    expect(repository.getAllByCity('Amsterdam', { page: 1 })).toHaveLength(2);

    // Check explicit limit
    expect(repository.getAllByCity('Amsterdam', { page: 1, perPage: 5 })).toHaveLength(5);
    expect(repository.getAllByCity('Amsterdam', { page: 1, perPage: 10 })).toHaveLength(5);

    // Check filter
    expect(
      repository.getAllByCity('Amsterdam', {
        page: 1,
        perPage: 10,
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
        order: Order.ASC,
      })[0].datetime,
    ).toBe('2014-08-08 00:00:00');
  });
});
