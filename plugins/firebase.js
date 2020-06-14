import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDhlLSoak2JpmLzAWGqSBkpwJLqYDm2qdY',
    authDomain: 'focusontrack-8d131.firebaseapp.com',
    databaseURL: 'https://focusontrack-8d131.firebaseio.com',
    projectId: 'focusontrack-8d131',
    storageBucket: 'focusontrack-8d131.appspot.com',
    messagingSenderId: '440754202644',
    appId: '1:440754202644:web:92bd3f1a6bc70466285f01',
    measurementId: 'G-T5E3VRJZEP'
  })
}

export default firebase
