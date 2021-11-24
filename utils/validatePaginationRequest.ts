import { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '../types/services/common';

export const validatePaginationRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    order,
    page,
    perPage,
    filters,
  } = req.body;

  if (order && [Order.ASC, Order.DESC].indexOf(order) === -1) {
    res.status(400).json({ error: 'Order must be ASC or DESC.' });
    return;
  }

  if (typeof page !== 'number') {
    res.status(400).json({ error: 'Page must be a number.' });
    return;
  }

  if (perPage && typeof perPage !== 'number') {
    res.status(400).json({ error: 'Limit must be a number.' });
    return;
  }

  if (filters && typeof filters !== 'object') {
    res.status(400).json({ error: 'Filters must be an object.' });
    return;
  }

  // eslint-disable-next-line consistent-return
  return {
    order,
    page,
    perPage,
    filters,
  };
};
