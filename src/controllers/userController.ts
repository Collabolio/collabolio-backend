import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import admin from '../services/firebase';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const uid = req.params.uid;
  try {
    const userRecord = await getAuth().getUser(uid);
    res.json(userRecord);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Could not fetch user' });
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userRecord = await getAuth().createUser({
      email: req.body.email,
      password: req.body.password,
      emailVerified: false,
      displayName: req.body.displayName,
      disabled: false,
      photoURL:
        req.body.photoURL || 'https://api.dicebear.com/6.x/pixel-art/svg',
    });
    await admin.firestore().collection('users').doc(userRecord.uid).set({
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
    res.json(userRecord);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Could not create user' });
  }
};

export const deleteUserAt = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const uid = req.params.uid;
  try {
    await getAuth().deleteUser(uid);
    const userRef = await admin.firestore().collection('users').doc(uid);
    await userRef.update({
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json('Delete Success');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Could not delete user' });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userRecord = await getAuth().listUsers();
    res.json(userRecord);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Could not fetch users' });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const uid = req.params.uid;
  try {
    const userRecord = await getAuth().updateUser(uid, {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      photoURL: req.body.photoURL,
    });
    const userRef = await admin.firestore().collection('users').doc(uid);
    await userRef.update({
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json(userRecord);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Could not update user' });
  }
};
