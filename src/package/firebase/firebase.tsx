'use client'
// Import the functions you need from the SDKs you need
// @ts-ignore
import { initializeApp } from 'firebase/app'
// @ts-ignore
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyAVlKStw_SkleHBSjMnqW9SEsg36aoW514',
  authDomain: 'swd301-f24a9.firebaseapp.com',
  projectId: 'swd301-f24a9',
  storageBucket: 'swd301-f24a9.appspot.com',
  messagingSenderId: '952088833548',
  appId: '1:952088833548:web:1c67e3c41ed09eb9bd8829',
  measurementId: 'G-1RB261ZR1G'
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const ggProvider = new GoogleAuthProvider();
// Initialize Firebase

