import * as admin from 'firebase-admin';
import serviceAccountKey from '../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
  databaseURL:
    'https://collabolio-dev-default-rtdb.asia-southeast1.firebasedatabase.app',
});

export { getUserRecords, createUserRecord } from './userRecords';
