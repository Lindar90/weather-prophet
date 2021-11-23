// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { WeatherEntryRepository } from '../../../services/repositories/WeatherEntryRepository';
import data from './data.json';
import { IWeatherEntry, IWeatherEntryRepository, OrderBy } from '../../../services/repositories/IWeatherEntryRepository';

type Data = {
  data?: IWeatherEntry[],
  error?: string,
};

const weatherEntriesRepo: IWeatherEntryRepository = new WeatherEntryRepository(data);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { city } = req.query;

  const {
    order,
    page,
    limit,
    filters,
  } = req.body;

  // Validate request data START

  if (typeof city !== 'string') {
    res.status(400).json({ error: 'City must be string.' });
    return;
  }

  if (order && [OrderBy.ASC, OrderBy.DESC].indexOf(order) === -1) {
    res.status(400).json({ error: 'Order must be ASC or DESC.' });
    return;
  }

  if (typeof page !== 'number') {
    res.status(400).json({ error: `Page must be number.${page}` });
    return;
  }

  if (limit && typeof limit !== 'number') {
    res.status(400).json({ error: 'Limit must be number.' });
    return;
  }

  if (filters && typeof filters !== 'object') {
    res.status(400).json({ error: 'Filters must be object.' });
    return;
  }

  // Validate request data END

  if (filters && filters.date) {
    filters.date = `${filters.date} 00:00:00`;
  }

  const entriesByCity = weatherEntriesRepo.getAllByCity(city, {
    order,
    page,
    limit,
    filters,
  });

  res.status(200).json({ data: entriesByCity });
}
