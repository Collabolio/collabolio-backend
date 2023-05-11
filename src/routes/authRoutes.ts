import { Router } from 'express';
import { getUser, register } from '../controllers/authController';

const router = Router();

router.post('/getUser', getUser);
router.post('/register', register);

export default router;
