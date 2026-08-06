import express from "express";
import { logger } from "./config/logger.js";
import { pinoHttp } from "pino-http";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();


app.use(pinoHttp({logger}));

app.get('/health', (req, res) => {
  logger.info('Health check endpoint hit');
  res.json({ status: 'ok', message: 'LedgerFlow API active' });
});
app.listen(3000, () => {
logger.info(`⚡️ Server listening on http://localhost:${PORT}`);
});