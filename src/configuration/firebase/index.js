// import * as auth from './auth'
import firebase from 'firebase/app'
import Rebase from 're-base' // https://github.com/tylermcginnis/re-base

import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBERJliCpaLN9ISU6fg6Cd7FxY20sriPwI',
  authDomain: 'fir-test-1653a.firebaseapp.com',
  databaseURL: 'https://fir-test-1653a.firebaseio.com',
  projectId: 'fir-test-1653a',
  storageBucket: 'fir-test-1653a.appspot.com',
  messagingSenderId: '615265698397'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.database()
const base = Rebase.createClass(db)
const auth = firebase.auth()

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);

export const updateProfile = (userId, profile) => {
  return base.update('profiles/' + userId, {
    data: {profile: profile}
  })
}

export const getProfiles = (userId) => {
  const endpoint = 'profiles/' + userId;
  console.log('fetching from', endpoint);
  return base.fetch(endpoint, {
    context: this
  })
}

export {
  auth,
  db,
  base
}

