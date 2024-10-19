import firebase from "firebase/compat/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: "finance-app-ddadb.appspot.com",
  messagingSenderId: "495659323671",
  appId: "1:495659323671:web:16cd07c163f93a55b22752",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
