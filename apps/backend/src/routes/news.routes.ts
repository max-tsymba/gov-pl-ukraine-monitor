import { Router } from 'express';

import { getUdscNews } from '../services/news.service.js';

// ============================ UDSC NEWS router ============================

export const newsRouter = Router();

newsRouter.get('/news', async (_reg, res) => {
  try {
    const items = await getUdscNews();

    res.json(items);
  } catch (error) {
    console.log('Failed to get news: ', error);

    res.status(500).json({
      message: 'Failed to fetch news',
    });
  }
});
