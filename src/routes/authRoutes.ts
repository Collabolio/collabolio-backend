import { Router } from 'express';
import { getUser, register, deleteUser, getAllUsers, updateUser } from '../controllers/authController';

const router = Router();

router.post('/getUser', getUser);
router.post('/register', register);
router.post('/delete', deleteUser);
router.post('/getAllUsers', getAllUsers);
router.post('/update', updateUser);

export default router;
