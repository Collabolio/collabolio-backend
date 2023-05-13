import { Router } from 'express';
import {
  getUser,
  registerUser,
  deleteUserAt,
  getAllUsers,
  updateUser,
} from '../controllers/authController';

const router = Router();

router.get('/user/:uid', getUser);
router.post('/register', registerUser);
router.delete('/user/:uid', deleteUserAt);
router.get('/users', getAllUsers);
router.put('/user/:uid', updateUser);

export default router;
