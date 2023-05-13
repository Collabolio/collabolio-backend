import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

import routes from './routes';

admin.initializeApp();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use('/', routes);

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const api = functions.https.onRequest(app);
