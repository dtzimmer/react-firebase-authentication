import firebase from 'firebase/app'
import Rebase from 're-base' // https://github.com/tylermcginnis/re-base
import Timestamp from 'firebase-firestore-timestamp'
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

// Update profile
export const updateProfile = (userId, profile) => {
  const time = Timestamp.now()
  const timestamp = new Timestamp(time.seconds, time.nanoseconds)
  return base.update('profiles/' + userId, {
    data: {profile: profile, timestamp: timestamp}
  })
}

// Update Profile Timestamp
export const updateProfileTimeStamp = (profileId) => {
  const time = Timestamp.now()
  const timestamp = new Timestamp(time.seconds, time.nanoseconds)
  return base.update('profiles/' + profileId, {
    data: { timestamp: timestamp}
  })
}

// Get all profiles
export const getProfiles = (userId) => {
  const endpoint = 'profiles/' + userId;
  return base.fetch(endpoint, {
    context: this
  })
}

//Create a comment
export const createComment = (comment, profileId) => {
  return base.update('comments/' + profileId, {
    data: {comment: comment}
  })
}

//Get a specific profile by its Id
export const getProfileById = async (profileId) => {
  console.log('get ' + profileId)
  const response = await base.fetch('profiles/' + profileId, {
    context: this
  })
  return response.profile
}

export const getCommentById = async (commentId) => {
  const response = await base.fetch('comments/' + commentId, {
    context: this
  })
  return response.comment
}

export const getOldestProfile = async () => {
  const response = await base.fetch('profiles', {
    queries: {
      orderByChild: 'timestamp/seconds',
      limitToFirst: 1
    }
  });

  return Object.keys(response).reduce((prev, current) => current)
}

export const deleteComment = async (commentId) => {
  base.remove('comments/' + commentId)
}

export {
  auth,
  db,
  base
}

