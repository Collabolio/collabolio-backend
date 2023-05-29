import * as admin from 'firebase-admin';

const db = admin.database();
export const Users = db.ref('users');
