import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "API Key",
  authDomain: "drone-stream-473321.firebaseapp.com",
  projectId: "drone-stream-473321",
  storageBucket: "drone-stream-473321.firebasestorage.app",
  messagingSenderId: "530875888927",
  appId: "1:530875888927:web:1dc4f3ef304f87a6fd2c2a",
  measurementId: "G-ZDT08PEX6X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);