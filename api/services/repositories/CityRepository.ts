import { ICityPagination, ICityRepository } from '../../../types/services/ICityRepository';
import { AbstractRepository } from './AbstractRepository';
import { Order } from '../../../types/services/common';

export class CityRepository extends AbstractRepository implements ICityRepository {
  getAllNames(pagination: ICityPagination): string[] {
    const cityNames = new Set<string>();
    const filterName = pagination.filters?.name.toLowerCase();

    this.entries.forEach((entry) => {
      if (filterName && !entry.place_name.toLowerCase().includes(filterName)) return;

      cityNames.add(entry.place_name);
    });

    let filteredCities = Array.from(cityNames);

    filteredCities = pagination.order === Order.ASC
      ? filteredCities.sort()
      : filteredCities.sort().reverse();

    return this.paginate(filteredCities, pagination.page, pagination.perPage);
  }
}
