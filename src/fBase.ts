// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
//인증
import {
  getAuth, 
  onAuthStateChanged, // 현재 로그인한 사용자 가져오기
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, // 이메일 주소와 비밀번호로 사용자 로그인
  signInWithPopup, GoogleAuthProvider, signOut, 
} from "firebase/auth";

import { 
  getFirestore, getDocs, collection, addDoc, query, orderBy, limit ,  
  doc, onSnapshot, deleteDoc, updateDoc, where 
} from "firebase/firestore";
import { getStorage, uploadBytes, ref, uploadBytesResumable, deleteObject, getDownloadURL} from "firebase/storage";

import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
  
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app, `${firebaseConfig.storageBucket}`);
const database = getDatabase(app);
// const analytics = getAnalytics(app);
export {app, auth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signInWithPopup, GoogleAuthProvider,
  signOut,
  db, collection, addDoc, getDocs, query, orderBy, limit, doc, onSnapshot,deleteDoc, where,
  storage, ref, uploadBytes, uploadBytesResumable,
  database, deleteObject, updateDoc, getDownloadURL

}