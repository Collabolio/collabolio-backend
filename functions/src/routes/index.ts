import { Router } from 'express';
import authRoutes from './authRoutes';
// eslint-disable-next-line new-cap
const routes = Router();

routes.use('/api/auth', authRoutes);

export default routes;
