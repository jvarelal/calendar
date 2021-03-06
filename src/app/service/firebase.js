import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyCScSGRwIB8BNsy1Fil5UmROzWIaAPN-V0",
  authDomain: "b-agenda.firebaseapp.com",
  databaseURL: "https://b-agenda.firebaseio.com",
  projectId: "b-agenda",
  storageBucket: "b-agenda.appspot.com",
  messagingSenderId: "1099082418017",
  appId: "1:1099082418017:web:338659d70d7b5229d2a720",
  measurementId: "G-DVT9YW64HY"
};


// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const provider = firebase.auth;

const db = fb.firestore();

const auth = fb.auth();

const FieldValue = firebase.firestore.FieldValue

export { provider, db, auth, FieldValue }
