// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { WeatherEntryRepository } from '../../../services/repositories/WeatherEntryRepository';
import data from '../data.json';
import { IWeatherEntry, IWeatherEntryRepository } from '../../../types/services/IWeatherEntryRepository';
import { validatePaginationRequest } from '../../../utils/validatePaginationRequest';
import { IResponse } from '../../../types/api/common';

type EntriesByCityResponse = IResponse<IWeatherEntry[]>;

const weatherEntriesRepo: IWeatherEntryRepository = new WeatherEntryRepository(data);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EntriesByCityResponse>,
) {
  const { city } = req.query;

  if (typeof city !== 'string') {
    res.status(400).json({ error: 'City must be string.' });
    return;
  }

  const pagination = validatePaginationRequest(req, res);

  if (!pagination) return;

  if (pagination.filters && pagination.filters.date) {
    pagination.filters.date = `${pagination.filters.date} 00:00:00`;
  }

  const entriesByCity = weatherEntriesRepo.getAllByCity(city, pagination);

  res.status(200).json({ data: entriesByCity });
}
