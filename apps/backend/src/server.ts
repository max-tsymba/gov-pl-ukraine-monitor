import dotenv from 'dotenv';
import { createApp } from './app.js';

dotenv.config();

// ============================ CONFIGS ============================
const PORT = Number(process.env.PORT) || 4000;
const app = createApp();

// ============================ APP ============================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
