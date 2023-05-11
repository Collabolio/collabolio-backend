import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import admin from '../services/firebase';

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
  // const createUser: CreateRequest = {
  //   email: 'aszaychik@example.com',
  //   password: 'password123',
  //   displayName: 'As Zaychik',
  //   photoURL: 'https://api.dicebear.com/6.x/pixel-art/svg',
  // };
  getAuth()
    .createUser({
      email: req.body.email,
      password: req.body.password,
      emailVerified: false,
      displayName: req.body.displayName,
      disabled: false,
      photoURL: req.body.photoURL
        ? req.body.photoURL
        : 'https://api.dicebear.com/6.x/pixel-art/svg',
    })
    .then((userRecord) => {
      res.json(userRecord);
      const userRef = admin.firestore().collection('users').doc(userRecord.uid);
      return userRef.set({
        email: userRecord.email,
        emailVerified: userRecord.emailVerified,
        displayName: userRecord.displayName,
        disabled: userRecord.disabled,
        photoURL: userRecord.photoURL,
        isAdmin: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        deletedAt: null,
      });
    });
};
