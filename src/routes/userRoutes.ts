import { Router } from 'express';
import {
  getUser,
  getAllUsers,
  registerUser,
  updateUser,
  deleteUserAt,
} from '../controllers/userController';

const router = Router();

router.get('/:uid', getUser);
router.get('/all', getAllUsers);
router.post('/register', registerUser);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUserAt);

export default router;
