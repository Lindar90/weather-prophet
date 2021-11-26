import { NextApiRequest, NextApiResponse } from 'next';
import { IResponse } from '../../types/api/common';
import { validatePaginationRequest } from '../../api/utils/validatePaginationRequest';
import { ICityRepository } from '../../types/services/ICityRepository';
import { CityRepository } from '../../api/services/repositories/CityRepository';
import data from './data.json';

type CitiesResponse = IResponse<string[]>;

const citiesRepo: ICityRepository = new CityRepository(data);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CitiesResponse>,
) {
  const pagination = validatePaginationRequest(req, res);
  if (!pagination) return;

  const cities = citiesRepo.getAllNames(pagination);

  res.status(200).json({ data: cities });
}
