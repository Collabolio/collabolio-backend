import * as functions from 'firebase-functions';
import { UserRecord } from 'firebase-admin/auth';
import { Users } from './models/Users';

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
        createdAt: new Date(),
        updatedAt: new Date(),
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
        const { code, message, details } = error;
        return functions.logger.error(
          `Error code: ${code}, message: ${message}, details: ${details}`,
        );
      });
  });
