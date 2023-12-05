// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'mernauth2023.firebaseapp.com',
  projectId: 'mernauth2023',
  storageBucket: 'mernauth2023.appspot.com',
  messagingSenderId: '266300166783',
  appId: '1:266300166783:web:11330cc10ae608d278254a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
