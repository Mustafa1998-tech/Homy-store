import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkMurqp8HMIeYRlyM-tr3eP5L7VqHbWC4",
  authDomain: "homey-h1x0c.firebaseapp.com",
  projectId: "homey-h1x0c",
  storageBucket: "homey-h1x0c.firebasestorage.app",
  messagingSenderId: "193133831855",
  appId: "1:193133831855:web:097dc83988fb69e232565a"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }; 