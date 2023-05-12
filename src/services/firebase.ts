import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://collabolio-dev.firebaseio.com',
});

export default admin;
