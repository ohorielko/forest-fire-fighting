import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDfj2g4ngx_We0x-A_5eZ4vhH6-4j3IqTk",
  authDomain: "forest-fire-fighting.firebaseapp.com",
  projectId: "forest-fire-fighting",
  storageBucket: "forest-fire-fighting.firebasestorage.app",
  messagingSenderId: "412071838636",
  appId: "1:412071838636:web:17db4ccd7efbb24446b009",
  measurementId: "G-6952C4EDK6"
};


const firebaseTele = {
  apiKey: "AIzaSyCNRZRkkAxKScM759_8mJWfqcsf5J8GXic",
  authDomain: "drone-stream-473321.firebaseapp.com",
  projectId: "drone-stream-473321",
  storageBucket: "drone-stream-473321.firebasestorage.app",
  messagingSenderId: "530875888927",
  appId: "1:530875888927:web:1dc4f3ef304f87a6fd2c2a",
  measurementId: "G-ZDT08PEX6X"
};


const app = initializeApp(firebaseConfig);
const tele = initializeApp(firebaseTele, "tele");
export const auth = getAuth(app);
export const db = getFirestore(app);
export const telemetary = getFirestore(tele);