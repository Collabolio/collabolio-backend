import { Router } from 'express';
import {
  getUser,
  getAllUsers,
  loginUser,
  registerUser,
  updateUser,
  deleteUserAt,
} from '../controllers/authController';

const router = Router();

router.get('/user/:uid', getUser);
router.get('/users', getAllUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/user/:uid', updateUser);
router.delete('/user/:uid', deleteUserAt);

export default router;
