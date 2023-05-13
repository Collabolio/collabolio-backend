import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

import routes from './routes';

admin.initializeApp();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: true }));
app.use('/', routes);
app.listen(port, () => console.log(`Server started on port ${port}`));

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const api = functions.https.onRequest(app);
