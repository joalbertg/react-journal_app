import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDYFs-fFuGFXpDC3ui1C_L6ibz7EPYA4ac",
  authDomain: "udemy-journal-app.firebaseapp.com",
  databaseURL: "https://udemy-journal-app.firebaseio.com",
  projectId: "udemy-journal-app",
  storageBucket: "udemy-journal-app.appspot.com",
  messagingSenderId: "436566690299",
  appId: "1:436566690299:web:f25ac388ef939cd938235e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  firebase,
  db,
  googleAuthProvider
}

