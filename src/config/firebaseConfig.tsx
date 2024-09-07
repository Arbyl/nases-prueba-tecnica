// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRlJyqi8xSpLAsQKpLJuo3dfZ5vH9fEuY",
    authDomain: "aventuradigital-4e336.firebaseapp.com",
    projectId: "aventuradigital-4e336",
    storageBucket: "aventuradigital-4e336.appspot.com",
    messagingSenderId: "334242960364",
    appId: "1:334242960364:web:170742bfb426044462a6c9",
    measurementId: "G-C1GWW1RGFM"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in:', result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };