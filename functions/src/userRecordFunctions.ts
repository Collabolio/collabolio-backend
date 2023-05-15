import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const db = admin.firestore();
import { UserRecord } from 'firebase-admin/auth';

export const createUserRecord = functions.auth
  .user()
  .onCreate(async (user: UserRecord) => {
    const userRef = db.collection('users').doc(user.uid);
    await userRef.set({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerData: user.providerData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      deletedAt: null,
      isAdmin: false,
      isBanned: false,
      isDeleted: false,
      lastLoginAt: null,
    });
  });
