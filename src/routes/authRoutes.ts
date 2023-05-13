import { Router } from 'express';
import {
  getUser,
  register,
  deleteUserAt,
  getAllUsers,
  updateUser,
} from '../controllers/authController';

const router = Router();

router.post('/getUser', getUser);
router.post('/register', register);
router.post('/delete', deleteUserAt);
router.post('/getAllUsers', getAllUsers);
router.post('/update', updateUser);

export default router;
