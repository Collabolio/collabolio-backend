import { Router, Response, Request } from 'express';

// Create router
const router = Router();

// Routes
router.get('/', (req: Request, res: Response) => {
  res.send('Hello Collabolio!');
});

export default router;
