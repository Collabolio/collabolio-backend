import { Router } from 'express';
import { helloWorld } from '../controllers';

// Create router
const router = Router();

// Routes
router.get('/', helloWorld);

export default router;
