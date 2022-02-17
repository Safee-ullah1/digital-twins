import { initializeApp, getApps, getApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'

import { GoogleAuthProvider, getAuth, EmailAuthProvider, FacebookAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyA8ZsFOoe5Je1qj27hKhpKCbo_DM3QF27g",
    authDomain: "digital-twin-bfbba.firebaseapp.com",
    projectId: "digital-twin-bfbba",
    storageBucket: "digital-twin-bfbba.appspot.com",
    messagingSenderId: "482254235551",
    appId: "1:482254235551:web:6d743d602e6773709ebfaa",
    measurementId: "G-ZVQPC975BB"
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();
const facebookProvider = new FacebookAuthProvider();


export { db, auth, googleProvider, emailProvider, facebookProvider };
