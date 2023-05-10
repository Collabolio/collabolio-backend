import { Request, Response } from 'express';

// Controller Function

export const helloWorld = (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
};
