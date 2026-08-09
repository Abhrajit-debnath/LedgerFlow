import dotenv from "dotenv";

dotenv.config();
console.log('🚀 SERVER DATABASE_URL →', process.env.DATABASE_URL);

import express from "express";
import { logger } from "./config/logger.js";
import { pinoHttp } from "pino-http";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import IndexRouter from "./routes/index.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(pinoHttp({logger}));

app.get('/health', (req, res) => {
  logger.info('Health check endpoint hit');
  res.json({ status: 'ok', message: 'LedgerFlow API active' });
});


app.use('/api/v1', IndexRouter);

app.use(errorMiddleware);
app.listen(PORT, () => {
logger.info(`⚡️ Server listening on http://localhost:${PORT}`);
});