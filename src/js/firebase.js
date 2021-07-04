import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCX7MxEcMNMMsG08i7UGDkeeZ-BHPgOlWM",
  authDomain: "nash-21.firebaseapp.com",
  projectId: "nash-21",
  storageBucket: "nash-21.appspot.com",
  messagingSenderId: "614722433121",
  appId: "1:614722433121:web:db6a6c64b5074614bcfa20",
  measurementId: "G-8P2WQK6EP9",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
