import firebase from "firebase/compat/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: "finance-app-ddadb.appspot.com",
  messagingSenderId: "495659323671",
  appId: "1:495659323671:web:16cd07c163f93a55b22752",
};

const app = firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

const auth = getAuth(app);
if (window.location.hostname.includes("localhost")) {
  connectAuthEmulator(auth, "http://localhost:9099/");
}

export { auth, app };
