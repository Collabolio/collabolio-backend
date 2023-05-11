import express, { Application } from 'express';
import route from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();

app.use('/', route);

export default app;
