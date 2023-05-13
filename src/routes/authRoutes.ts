import { Router } from 'express';
import {
  getUser,
  register,
  deleteUserAt,
  getAllUsers,
  updateUser,
} from '../controllers/authController';

const router = Router();

router.get('/getUser', getUser);
router.post('/register', register);
router.delete('/delete', deleteUserAt);
router.get('/getAllUsers', getAllUsers);
router.post('/update', updateUser);

export default router;
