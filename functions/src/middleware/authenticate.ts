import { Request, Response, NextFunction } from 'express';

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  next();
};
