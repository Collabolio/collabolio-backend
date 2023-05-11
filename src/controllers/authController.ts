import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { CreateRequest } from '../interfaces/user';

export const login = async (req: Request, res: Response): Promise<void> => {
  const uid = req.body.uid;
  getAuth()
    .getUser(uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      res.json(userRecord);
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const createUser: CreateRequest = {
    email: 'test@example.com',
    password: 'password123',
    displayName: 'John Doe',
    photoURL: 'https://api.dicebear.com/6.x/pixel-art/svg',
  };
  getAuth()
    .createUser({
      email: createUser.email,
      password: createUser.password,
      emailVerified: false,
      displayName: createUser.displayName,
      disabled: false,
      photoURL: createUser.photoURL
        ? createUser.photoURL
        : 'https://api.dicebear.com/6.x/pixel-art/svg',
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      res.json(userRecord);
    });
};
