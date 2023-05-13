import { Router } from 'express';
import {
  getUser,
  register,
  deleteUserAt,
  getAllUsers,
  updateUser,
} from '../controllers/authController';

const router = Router();

router.get('/user/:uid', getUser);
router.post('/register', register);
router.delete('/user/:uid', deleteUserAt);
router.get('/users', getAllUsers);
router.put('/user/:uid', updateUser);

export default router;
