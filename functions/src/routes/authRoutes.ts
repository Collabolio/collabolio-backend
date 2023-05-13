import { Router } from 'express';
import {
  createUserRecord,
  deleteUserRecord,
} from '../controllers/authController';

// eslint-disable-next-line new-cap
const routes = Router();

routes.post('/signup', createUserRecord);
routes.delete('/user/:id', deleteUserRecord);

export default routes;
