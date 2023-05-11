import express, { Application } from 'express';
import { initializeApp } from 'firebase-admin/app';
import helloWorld from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Configure the environment variables

initializeApp();
export const app: Application = express(); // Create the Express application

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) middleware to allow requests from different origins
app.use(express.json()); // Parse incoming requests with JSON payloads

app.use('/', helloWorld);
app.use('/api/auth', authRoutes); // Mount the routes
