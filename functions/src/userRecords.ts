import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Response } from 'firebase-functions';
import { UserRecord } from 'firebase-admin/auth';
import { Users } from './models/Users';

export const getUserRecords = functions
  .region('asia-southeast2')
  .https.onRequest(async (_req, res: Response) => {
    await Users.get();
    res.send(Users).sendStatus(200);
  });

export const createUserRecord = functions
  .region('asia-southeast2')
  .auth.user()
  .onCreate(async (user: UserRecord) => {
    await Users.child(user.uid)
      .set({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        providerData: user.providerData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        isAdmin: false,
        isBanned: false,
        profile: {
          displayName: user.displayName,
          photoURL:
            user.photoURL ||
            'https://storage.googleapis.com/collabolio-dev.appspot.com/assets/images/avatars/default-avatar.png',
          phoneNumber: user.phoneNumber,
          bio: 'Too lazy to write anything',
        },
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
