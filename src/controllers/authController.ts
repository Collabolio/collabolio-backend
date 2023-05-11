import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';

export const login = async (req: Request, res: Response): Promise<void> => {
  const uid = req.body.uid;
  getAuth()
    .getUser(uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched user data: ${userRecord.email}`);
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json('test register');
    // your register logic here
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
