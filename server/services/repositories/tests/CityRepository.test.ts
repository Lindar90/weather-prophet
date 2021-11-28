import { CityRepository } from '../CityRepository';
import { ICityRepository } from '../../../../types/services/ICityRepository';
import data from './data.test.json';
import { Order } from '../../../../types/services/common';

describe('CityRepository', () => {
  let repository: ICityRepository;

  beforeEach(() => {
    repository = new CityRepository(data);
  });

  it('should return all cities', () => {
    expect(
      repository.getAllNames({ page: 1, perPage: 100, order: Order.ASC }),
    ).toStrictEqual(['Amsterdam', 'Den Helder']);

    expect(
      repository.getAllNames({ page: 1, perPage: 100 }),
    ).toStrictEqual(['Den Helder', 'Amsterdam']);
  });

  it('should return filtered cities', () => {
    expect(
      repository.getAllNames({ page: 1, perPage: 100, filters: { name: 'Ams' } }),
    ).toStrictEqual(['Amsterdam']);
  });
});
