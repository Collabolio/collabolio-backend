import * as admin from 'firebase-admin';

admin.initializeApp();

export {
  getUserRecords,
  createUserRecord,
  setUserUidRecord,
} from './userRecordFunctions';
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
