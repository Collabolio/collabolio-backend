import express, { Application } from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Configure the environment variables

const app: Application = express(); // Create the Express application

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) middleware to allow requests from different origins
app.use(express.json()); // Parse incoming requests with JSON payloads

app.use('/', routes); // Mount the routes

export default app;
