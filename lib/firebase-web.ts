import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD2l3C3PNEXyxG50CcBRghawSSdAVuqDkk",
  authDomain: "clermont-c-supere.firebaseapp.com",
  projectId: "clermont-c-supere",
  storageBucket: "clermont-c-supere.appspot.com",
  messagingSenderId: "929851876685",
  appId: "1:929851876685:web:ca14f7d5b6b87aba650304",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
