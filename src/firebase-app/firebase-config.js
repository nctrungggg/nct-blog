import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBscwmc1AcNTG1BkuTdXtZZdGKVDWHVvnk",
  authDomain: "monkey-blogging-693b2.firebaseapp.com",
  projectId: "monkey-blogging-693b2",
  storageBucket: "monkey-blogging-693b2.appspot.com",
  messagingSenderId: "445109755369",
  appId: "1:445109755369:web:c02e9d58c5930ea812bf78",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
