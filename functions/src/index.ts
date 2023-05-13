import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

import routes from './routes';

admin.initializeApp();

const app = express.default();

app.use(express.json());
app.use('/', routes);

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const api = functions.https.onRequest(app);
