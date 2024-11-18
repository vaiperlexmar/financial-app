import firebase from "firebase/compat/app";

import { getAuth, connectAuthEmulator } from "firebase/auth";

import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: "finance-app-ddadb.appspot.com",
  messagingSenderId: "495659323671",
  appId: "1:495659323671:web:16cd07c163f93a55b22752",
};

const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth(app);
if (window.location.hostname.includes("localhost")) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", {
    disableWarnings: true,
  });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

async function createUser(uid, username, email) {
  try {
    const newDocRef = await setDoc(doc(db, "users", uid), {
      username,
      email,
      balance: 0,
      cards: [],
      incomeHistory: [],
      expenseHistory: [],
      depts: [],
      deptsAmount: 0,
      savings: [],
      savingsAmount: 0,
    });
  } catch (err) {
    console.error(err);
  }
}

export { auth, app, db, createUser };
