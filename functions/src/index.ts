import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export { createUserRecord } from './userRecordFunctions';
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});
