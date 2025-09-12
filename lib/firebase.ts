import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDfj2g4ngx_We0x-A_5eZ4vhH6-4j3IqTk",
  authDomain: "forest-fire-fighting.firebaseapp.com",
  projectId: "forest-fire-fighting",
  storageBucket: "forest-fire-fighting.firebasestorage.app",
  messagingSenderId: "412071838636",
  appId: "1:412071838636:web:17db4ccd7efbb24446b009",
  measurementId: "G-6952C4EDK6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);