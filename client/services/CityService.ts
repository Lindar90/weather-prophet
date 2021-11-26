export class CityService {
  constructor(
    private baseUrl: string,
  ) {}

  async getCityNames(searchTerm?: string): Promise<string[]> {
    const body = {
      page: 1,
      perPage: 1000,
      filters: searchTerm ? { name: searchTerm } : {}
    };

    const response = await fetch(`${this.baseUrl}/cities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const { data: names } = await response.json();

    return names;
  }
}
