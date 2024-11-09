import firebase from "firebase/compat/app";

import { getAuth, connectAuthEmulator } from "firebase/auth";

import { initializeFirestore } from "firebase/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: "finance-app-ddadb.appspot.com",
  messagingSenderId: "495659323671",
  appId: "1:495659323671:web:16cd07c163f93a55b22752",
};

const app = firebase.initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
})

const auth = getAuth(app);
if (window.location.hostname.includes("localhost")) {
  connectAuthEmulator(auth, "http://localhost:9099/");
  connectFirestoreEmulator(db, "http://localhost:8080/");
}

export { auth, app, db };
