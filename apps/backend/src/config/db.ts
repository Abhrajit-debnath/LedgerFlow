import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaNeon } from '@prisma/adapter-neon';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Please configure the database connection.');
}

export const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL })
});
