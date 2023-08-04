// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from 'firebase/database'
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhLwrYqg35T2lJRwI8dWb5rvLGfYEzpVw",
  authDomain: "docs-b6ac2.firebaseapp.com",
  projectId: "docs-b6ac2",
  storageBucket: "docs-b6ac2.appspot.com",
  messagingSenderId: "237106934578",
  appId: "1:237106934578:web:f6b9919b1439146c37dd2b",
  measurementId: "G-16KQXT6J3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const database = getDatabase(app)

export const firestore = getFirestore(app)

const provider = new GoogleAuthProvider();

const docs = collection(firestore, "docs");

export const loginWithGoogle = () => {
  signInWithPopup(auth, provider);
};

export const logout = () => {
  signOut(auth);
};


export const getDocuments = (setDocs: any) => {
  let docQuery = query(docs, where("userId", "==", auth.currentUser?.uid));
  onSnapshot(docQuery, (response) => {
    setDocs(
      response.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};


export const getCurrentDoc = async (id: string, setCurrentDocument: any) => {
  let docToGet = doc(docs, id);
  await onSnapshot(docToGet, (response) => {
    setCurrentDocument(response.data());
  });
};
