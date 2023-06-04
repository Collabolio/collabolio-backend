import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Response } from 'firebase-functions';
import { UserRecord } from 'firebase-admin/auth';

const db = admin.firestore();

export const getUserRecords = functions
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
    if (!user.email) {
      return functions.logger.error('Email is not defined');
    }
    await userRef
      .set({
        email: user.email,
        emailVerified: user.emailVerified,
        username: user.email.split('@')[0],
        providerData: user.providerData,
        createdAt: user.metadata.creationTime,
        updatedAt: user.metadata.creationTime,
        lastLoginAt: user.metadata.lastSignInTime || user.metadata.creationTime,
        disable: user.disabled,
        isAdmin: false,
        profile: {
          displayName: user.displayName,
          photoURL:
            user.photoURL ||
            'https://storage.googleapis.com/collabolio-dev.appspot.com/assets/images/avatars/default-avatar.png',
          phoneNumber: user.phoneNumber,
          bio: 'Too lazy to write anything',
        },
      })
      .catch((error) => {
        const { code, message, details } = error;
        return functions.logger.error(
          `Error code: ${code}, message: ${message}, details: ${details}`,
        );
      });
  });

export const setUserUidRecord = functions
  .region('asia-southeast2')
  .firestore.document('users/{uid}')
  .onCreate(async (snapshot) => {
    const uid = snapshot.id;
    const userRef = db.collection('users').doc(uid);
    await userRef.update({ uid });
  });

export const setSkillUidRecord = functions
  .region('asia-southeast2')
  .firestore.document('skills/{uid}')
  .onCreate(async (snapshot) => {
    const uid = snapshot.id;
    const userRef = db.collection('skills').doc(uid);
    await userRef.update({ uid });
  });

export const setUserSkillUidRecord = functions
  .region('asia-southeast2')
  .firestore.document('users/{userId}')
  .onWrite(async (change) => {
    const userSnapshot: any = change.after;

    if (!userSnapshot.exists) {
      console.log('User document does not exist');
      return null;
    }

    const userProfile = userSnapshot.data().profile;
    const userSkills = userProfile.skills;

    if (!Array.isArray(userSkills) || userSkills.length === 0) {
      console.log('User has no skills');
      return null;
    }

    const skillsSnapshot = await db.collection('skills').get();

    userSkills.forEach((userSkill) => {
      if (!userSkill.uid && userSkill.name) {
        const matchingSkill = skillsSnapshot.docs.find(
          (skillDoc) => skillDoc.data().skill === userSkill.name,
        );

        if (matchingSkill) {
          const skillId = matchingSkill.id;
          userSkill.uid = skillId;
        }
      }
    });

    // Update the user document with the modified skills
    await userSnapshot.ref.set({ profile: userProfile }, { merge: true });

    console.log('Skills ID updated successfully');
    return null;
  });
