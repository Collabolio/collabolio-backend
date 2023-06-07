import * as admin from 'firebase-admin';

admin.initializeApp();

export {
  getUserRecords,
  createUserRecord,
  setUpdatedAtRecord,
  setUserUidRecord,
  setSkillUidRecord,
  setInterestUidRecord,
  setUserSkillInterestUidRecord,
} from './userRecordFunctions';
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
