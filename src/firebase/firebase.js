import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAUetLv1LoJA6d8xS2VME8r8w5wZSH8ttE",
    authDomain: "react-firebase-authentic-345f1.firebaseapp.com",
    databaseURL: "https://react-firebase-authentic-345f1.firebaseio.com",
    projectId: "react-firebase-authentic-345f1",
    storageBucket: "react-firebase-authentic-345f1.appspot.com",
    messagingSenderId: "276335862691"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};