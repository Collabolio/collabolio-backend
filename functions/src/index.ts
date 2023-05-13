import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

admin.initializeApp();

const app = express.default();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const api = functions.https.onRequest(app);
