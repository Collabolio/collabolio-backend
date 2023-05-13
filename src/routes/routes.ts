import { Router } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import { helloWorld } from '../controllers';

// Create router
const router = Router();

// Routes
router.get('/', helloWorld);
router.use('/api/user', userRoutes);
router.use('/api/auth', authRoutes);

export default router;
