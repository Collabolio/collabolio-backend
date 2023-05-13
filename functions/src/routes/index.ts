import { Router, Request, Response } from 'express';

// eslint-disable-next-line new-cap
const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello World' });
});

export default routes;
