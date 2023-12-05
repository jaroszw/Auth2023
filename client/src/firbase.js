// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'mernauth2023.firebaseapp.com',
  projectId: 'mernauth2023',
  storageBucket: 'mernauth2023.appspot.com',
  messagingSenderId: '266300166783',
  appId: '1:266300166783:web:11330cc10ae608d278254a',
};

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider(auth);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
