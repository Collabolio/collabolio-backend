import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Response } from 'firebase-functions';
import { UserRecord } from 'firebase-admin/auth';

const db = admin.firestore();

export const getAllUserRecord = functions
  .region('asia-southeast2')
  .https.onRequest(async (_req, res: Response) => {
    const snapshot = await db.collection('users').orderBy('createdAt').get();
    const users = snapshot.docs.map((doc) => doc.data());
    res.send(users).sendStatus(200);
  });

export const createUserRecord = functions
  .region('asia-southeast2')
  .auth.user()
  .onCreate(async (user: UserRecord) => {
    const userRef = db.collection('users').doc(user.uid);
    await userRef
      .set({
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
      })
      .catch((error) => {
        const code = error.code;
        const message = error.message;
        const details = error.details;
        return functions.logger.error(
          `Error code: ${code}, message: ${message}, details: ${details}`,
        );
      });
  });
