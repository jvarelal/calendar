import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAs39HeJ1vEclvbpX-Z3Ztbp6C_vYyOJQM",
    authDomain: "n-agenda.firebaseapp.com",
    projectId: "n-agenda",
    storageBucket: "n-agenda.appspot.com",
    messagingSenderId: "512073291750",
    appId: "1:512073291750:web:0fe3281878d65d99b1a827",
    measurementId: "G-J7Q1QN5T5C"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const provider = firebase.auth;

const db = fb.firestore();

const auth = fb.auth();

const FieldValue = firebase.firestore.FieldValue

export { provider, db, auth, FieldValue }
