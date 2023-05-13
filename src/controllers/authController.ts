import { Request, Response } from 'express';
import admin from 'firebase-admin';
import crypto from 'crypto';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Get the user object from Firebase Authentication using the email address
    const userRecord = await admin.auth().getUserByEmail(email);

    // Check if the user object includes the passwordSalt property
    if (!userRecord.passwordSalt) {
      throw new Error('Invalid email or password');
    }

    // Compare the entered password with the password hash stored in the user object using the crypto module
    const hash = crypto
      .pbkdf2Sync(password, userRecord.passwordSalt, 1000, 64, 'sha512')
      .toString('hex');
    if (hash !== userRecord.passwordHash) {
      throw new Error('Invalid email or password');
    }

    // Create a custom JWT token with the user's UID as the subject
    const token = await admin.auth().createCustomToken(userRecord.uid);

    // Send the token back to the client
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, displayName } = req.body;

  try {
    // Create the user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Generate a random salt for the user's password hash
    const passwordSalt = crypto.randomBytes(16).toString('hex');

    // Hash the user's password with the salt using the crypto module
    const passwordHash = crypto
      .pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha512')
      .toString('hex');

    // Store the password salt and hash in the user object in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email,
      displayName,
      passwordSalt,
      passwordHash,
    });

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};
