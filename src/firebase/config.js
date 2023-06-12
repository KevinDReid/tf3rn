import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD4rNygg5CKRJMcZbJfqGg7eQkCZ3Ojd3E",
  authDomain: "tf3rn-754ae.firebaseapp.com",
  projectId: "tf3rn-754ae",
  storageBucket: "tf3rn-754ae.appspot.com",
  messagingSenderId: "730670200157",
  appId: "1:730670200157:web:85db2588de69a92bbd64b4",
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
