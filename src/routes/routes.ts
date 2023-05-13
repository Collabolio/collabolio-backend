import { Router } from 'express';
import userRoutes from './userRoutes';
import { helloWorld } from '../controllers';

// Create router
const router = Router();

// Routes
router.get('/', helloWorld);
router.use('/api/user', userRoutes);

export default router;
