import { Router } from 'express';
import { helloWorld } from '../controllers';

// Create router
export const router = Router();

// Routes
router.get('/', helloWorld);
