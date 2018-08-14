// import * as auth from './auth'
import firebase from 'firebase/app'
import Rebase from 're-base'

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

export {
  auth,
  db,
  base
}

