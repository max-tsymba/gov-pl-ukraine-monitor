import express from 'express';
import cors from 'cors';

import { newsRouter } from './routes/news.routes.js';

// ============================ EXPRESS APP ============================
export function createApp() {
  const app = express();

  // --------------- uses handlers ---------------
  app.use(cors());
  app.use(express.json());

  // --------------- api endpoints ----------------
  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      message: 'Backend is running',
    });
  });

  app.use('/api', newsRouter);

  return app;
}
