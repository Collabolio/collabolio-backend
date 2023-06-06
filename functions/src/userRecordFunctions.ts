import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Response } from 'firebase-functions';
import { UserRecord } from 'firebase-admin/auth';
import { openai } from './services/openai';

const db = admin.firestore();
const batch = db.batch();

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
    await userRef.update({ uid }).catch((error) => {
      const { code, message, details } = error;
      return functions.logger.error(
        `Error code: ${code}, message: ${message}, details: ${details}`,
      );
    });
  });

export const setSkillUidRecord = functions
  .region('asia-southeast2')
  .firestore.document('skills/{uid}')
  .onCreate(async (snapshot) => {
    const uid = snapshot.id;
    const userRef = db.collection('skills').doc(uid);
    await userRef.update({ uid }).catch((error) => {
      const { code, message, details } = error;
      return functions.logger.error(
        `Error code: ${code}, message: ${message}, details: ${details}`,
      );
    });
  });

export const setInterestUidRecord = functions
  .region('asia-southeast2')
  .firestore.document('interests/{uid}')
  .onCreate(async (snapshot) => {
    const uid = snapshot.id;
    const userRef = db.collection('interests').doc(uid);
    await userRef.update({ uid }).catch((error) => {
      const { code, message, details } = error;
      return functions.logger.error(
        `Error code: ${code}, message: ${message}, details: ${details}`,
      );
    });
  });

export const setUserSkillUidRecord = functions
  .region('asia-southeast2')
  .firestore.document('users/{uid}')
  .onWrite(async (change) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    userSkills.forEach(async (userSkill) => {
      if (!userSkill.uid && userSkill.name) {
        let matchingSkill = skillsSnapshot.docs.find(
          (skillDoc) => skillDoc.data().name === userSkill.name,
        );
        if (!matchingSkill) {
          await db.collection('skills').add({
            name: userSkill.name,
          });
          matchingSkill = skillsSnapshot.docs.find(
            (skillDoc) => skillDoc.data().name === userSkill.name,
          );
        }
        if (matchingSkill) {
          const skillId = matchingSkill.id;
          userSkill.uid = skillId;
        }
      }
    });

    // Update the user document with the modified skills
    await userSnapshot.ref.set({ profile: userProfile }, { merge: true });
    batch.update(userSnapshot.ref, { updatedAt: new Date() });

    await batch.commit();

    return null;
  });

export const setUserInterestUidRecord = functions
  .region('asia-southeast2')
  .firestore.document('users/{uid}')
  .onWrite(async (change) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userSnapshot: any = change.after;

    if (!userSnapshot.exists) {
      console.log('User document does not exist');
      return null;
    }

    const userProfile = userSnapshot.data().profile;
    const userInterests = userProfile.interests;

    if (!Array.isArray(userInterests) || userInterests.length === 0) {
      console.log('User has no Interests');
      return null;
    }

    const InterestsSnapshot = await db.collection('interests').get();

    userInterests.forEach(async (userInterest) => {
      if (!userInterest.uid && userInterest.name) {
        let matchingInterest = InterestsSnapshot.docs.find(
          (interestDoc) => interestDoc.data().name === userInterest.name,
        );
        if (!matchingInterest) {
          await db.collection('interests').add({
            name: userInterest.name,
          });
          matchingInterest = InterestsSnapshot.docs.find(
            (interestDoc) => interestDoc.data().name === userInterest.name,
          );
        }
        if (matchingInterest) {
          const interestId = matchingInterest.id;
          userInterest.uid = interestId;
        }
      }
    });

    // Update the user document with the modified skills
    await userSnapshot.ref.set({ profile: userProfile }, { merge: true });
    batch.update(userSnapshot.ref, { updatedAt: new Date() });

    await batch.commit();

    return null;
  });

export const generateUserStoryRecordWithOpenAI = functions
  .region('asia-southeast2')
  .firestore.document('users/{uid}')
  .onWrite(async (change) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userSnapshot: any = change.after;

    if (!userSnapshot.exists) {
      console.log('User document does not exist');
      return null;
    }

    const userData = await userSnapshot.data();
    const userProfile = userData.profile;

    const response = openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Create me user story for my profile,
        portofolio purpose based on this data : 
        ${userData}
        `,
        },
      ],
    });

    if (!response) return console.log('response is null', response);

    const story = await response.then((res) => res.data.choices[0].message);

    userProfile.story = story;

    await userSnapshot.ref.set({ profile: userProfile }, { merge: true });
  });
