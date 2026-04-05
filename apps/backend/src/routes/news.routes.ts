import { Router, Request, Response } from 'express';

import { getUdscNews } from '../services/news.service.js';
import { parsePositiveNumber } from '../utils/helper.js';

// ============================ UDSC NEWS router ============================

export const newsRouter = Router();

newsRouter.get('/news', async (req: Request, res: Response) => {
  try {
    const page = parsePositiveNumber(req.query.page) ?? 1;
    const size = parsePositiveNumber(req.query.size) ?? 10;

    const result = await getUdscNews({ page, size });

    res.json(result);
  } catch (error) {
    console.log('Failed to get news: ', error);

    res.status(500).json({
      message: 'Failed to fetch news',
    });
  }
});
